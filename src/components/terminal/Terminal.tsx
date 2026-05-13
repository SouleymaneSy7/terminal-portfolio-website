"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import CommandInput from "./CommandInput";
import { TerminalErrorBoundary } from "./TerminalErrorBoundary";

import { handleWelcomeCommand } from "@/commands";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { useCommandHistory, useThemeFont } from "@/hooks";
import { audioService } from "@/services";

import { LOADERS } from "@/commands/loader-command";
import type {
    CommandHistory,
    CommandHistoryOutputType,
    LoadingVariant,
    SerializableHistoryType,
    TerminalPropsTypes,
} from "@/types";
import { executeCommand } from "@/utils/command";
import VisuallyHidden from "../common/VisuallyHidden";
import { LoadingIndicator } from "../ui/loaders";
import HistoryEntry from "./HistoryEntry";

const STORAGE_KEY = STORAGE_KEYS.COMMAND_HISTORY;

function getWelcomeEntry(): CommandHistory {
  return {
    command: "welcome",
    output: handleWelcomeCommand([]) as CommandHistoryOutputType,
  };
}

// ─────────────────────────────────────────────────────────────────
// TERMINAL (inner — wrapped by error boundary below)
// ─────────────────────────────────────────────────────────────────

const TerminalInner: React.FC<TerminalPropsTypes> = ({ containerRef }) => {
  const [input, setInput] = React.useState("");
  const [commandIndex, setCommandIndex] = React.useState(-1);
  const [inputReady, setInputReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loaderVariant, setLoaderVariant] = React.useState<LoadingVariant>("braille");

  const currentCommandId = React.useRef(0);
  const runningCommandRef = React.useRef<string>("");
  const safetyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInitialized = React.useRef(false);

  const { history, pushEntry, clearHistory, isHydrated } = useCommandHistory();

  useThemeFont();

  // ── Derived: command history strings for Ctrl+R ───────────────
  const commandHistory = React.useMemo(
    () => history.map((h) => h.command).filter((c) => c && c !== "^C"),
    [history],
  );

  const clearSafetyTimer = React.useCallback(() => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  }, []);

  // ── Cancel (Ctrl+C while loading) ────────────────────────────
  const handleCancelCommand = React.useCallback(() => {
    currentCommandId.current++;
    clearSafetyTimer();
    setIsLoading(false);
    setInputReady(true);

    const cancelled = runningCommandRef.current;
    runningCommandRef.current = "";

    if (cancelled) {
      pushEntry({
        command: cancelled,
        output: [
          {
            id: crypto.randomUUID(),
            type: "text" as const,
            content: ["^C", "Interrupt signal received"],
          },
        ],
      });
    }
    setCommandIndex(-1);
  }, [clearSafetyTimer, pushEntry]);

  // ── Loaders ───────
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOADER) as LoadingVariant | null;
    if (saved && saved in LOADERS) setLoaderVariant(saved);
  }, []);

  React.useEffect(() => {
    const handler = (event: Event) => {
      const { variant } = (event as CustomEvent<{ variant: LoadingVariant }>).detail;
      setLoaderVariant(variant);
    };

    window.addEventListener("terminal:loader-change", handler);
    return () => window.removeEventListener("terminal:loader-change", handler);
  }, []);

  // ── Welcome entry on first load ───────────────────────────────
  React.useEffect(() => {
    if (!isHydrated || hasInitialized.current) return;
    hasInitialized.current = true;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      pushEntry(getWelcomeEntry());
    } else {
      try {
        const parsed: SerializableHistoryType = JSON.parse(raw);
        if (parsed.length === 0) setInputReady(true);
      } catch {
        setInputReady(true);
      }
    }
  }, [isHydrated, pushEntry]);

  // ── Auto-scroll on new output ─────────────────────────────────
  React.useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, containerRef]);

  // ── Cleanup safety timer on unmount ──────────────────────────
  React.useEffect(() => {
    return () => clearSafetyTimer();
  }, [clearSafetyTimer]);

  // ── Ctrl+C global listener (only active during loading) ───────
  React.useEffect(() => {
    if (!isLoading) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        handleCancelCommand();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, handleCancelCommand]);

  // ─────────────────────────────────────────────────────────────
  // COMMAND HANDLER
  // ─────────────────────────────────────────────────────────────

  const handleCommand = async (command: string) => {
    if (command.trim().toLowerCase() === "clear") {
      clearHistory();
      setInputReady(true);
      setCommandIndex(-1);
      return;
    }

    const commandId = ++currentCommandId.current;
    runningCommandRef.current = command;

    setInputReady(false);
    setIsLoading(true);
    clearSafetyTimer();

    // Safety fallback — restore input after 10s if command hangs
    safetyTimer.current = setTimeout(() => {
      if (currentCommandId.current === commandId) {
        setIsLoading(false);
        setInputReady(true);
        runningCommandRef.current = "";
      }
    }, 10000);

    try {
      const commandOutput = await executeCommand(command);

      // Stale check — if cancelled, discard result
      if (currentCommandId.current !== commandId) return;

      const normalizedOutput = Array.isArray(commandOutput) ? commandOutput : [commandOutput];

      pushEntry({
        id: crypto.randomUUID(),
        command,
        output: normalizedOutput as CommandHistoryOutputType,
      });

      audioService.play("success");
    } catch {
      audioService.play("error");

      if (currentCommandId.current !== commandId) return;

      pushEntry({
        command,
        output: [
          {
            id: crypto.randomUUID(),
            type: "text" as const,
            content: ["Error: command failed. Please try again."],
          },
        ],
      });
      setInputReady(true);
    } finally {
      if (currentCommandId.current === commandId) {
        clearSafetyTimer();
        setIsLoading(false);
        runningCommandRef.current = "";
      }
    }

    setCommandIndex(-1);
  };

  const handleClearTerminal = () => {
    clearHistory();
    setInputReady(true);
    setCommandIndex(-1);
  };

  const handleArrowUp = () => {
    if (commandIndex < history.length - 1) {
      const newIndex = commandIndex + 1;
      const historyIdx = history.length - 1 - newIndex;
      setCommandIndex(newIndex);
      if (historyIdx >= 0) return history[historyIdx].command;
    }
    return "";
  };

  const handleArrowDown = () => {
    if (commandIndex > 0) {
      const newIndex = commandIndex - 1;
      const historyIdx = history.length - 1 - newIndex;
      setCommandIndex(newIndex);
      if (historyIdx >= 0) return history[historyIdx].command;
    } else if (commandIndex === 0) {
      setCommandIndex(-1);
      return "";
    }
    return "";
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div role="application" aria-label="Souleymane Sy — interactive terminal portfolio">
      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-atomic="false"
        aria-label="Terminal command history"
        aria-describedby="terminal-hint"
      >
        <AnimatePresence>
          {isHydrated &&
            history.map((item: CommandHistory, index: number) => {
              const isLastEntry = index === history.length - 1;

              return (
                <HistoryEntry
                  key={`${item.command}-${index}`}
                  item={item}
                  index={index}
                  isLastEntry={isLastEntry}
                  setInputReady={setInputReady}
                />
              );
            })}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            role="status"
            aria-live="polite"
            aria-label="Processing command… press Ctrl+C to cancel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <LoadingIndicator variant={loaderVariant} />
          </motion.div>
        )}

        {inputReady && !isLoading && (
          <motion.div
            key="command-input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CommandInput
              input={input}
              setInput={setInput}
              onCommandType={handleCommand}
              onArrowUp={handleArrowUp}
              onArrowDown={handleArrowDown}
              onClearTerminal={handleClearTerminal}
              commandHistory={commandHistory}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-hidden="true" style={{ height: "12rem" }} />

      <VisuallyHidden id="terminal-hint">
        Interactive terminal. Type commands and press Enter to execute. Use arrow keys to navigate
        history.
      </VisuallyHidden>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// TERMINAL  (public export — wrapped with Error Boundary)
// ─────────────────────────────────────────────────────────────────

const Terminal: React.FC<TerminalPropsTypes> = (props) => (
  <TerminalErrorBoundary>
    <TerminalInner {...props} />
  </TerminalErrorBoundary>
);

export default Terminal;
