"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import CommandInput from "./CommandInput";
import LoadingIndicator from "./ui/loading-indicator";
import useLocalStorage from "@/hooks/useLocalStorage";

import {
  CommandHistory,
  CommandHistoryOutput,
  CommandHistoryTypes,
  TerminalPropsTypes,
} from "@/types";
import { executeCommand } from "@/utils/command";
import { welcomeCommandOutput } from "@/commands";
import TerminalPrompt from "./TerminalPrompt";

const CommandOutput = dynamic(() => import("./CommandOutput"), { ssr: false });

const STORAGE_KEY = "terminal:command-history";
const MAX_HISTORY = 50;

type SerializableBlock =
  | { id: string; type: "text"; content: string[] }
  | { id: string; type: "html"; content: string[] }
  | { id: string; type: "link"; content: string[][] };

type SerializableEntry = {
  command: string;
  output: SerializableBlock[];
};

type SerializableHistory = SerializableEntry[];

function toSerializable(entry: CommandHistory): SerializableEntry {
  return {
    command: entry.command,
    output: entry.output.filter(
      (block): block is SerializableBlock => block.type !== "component",
    ),
  };
}

function getWelcomeEntry(): CommandHistory {
  return {
    command: "welcome",
    output: welcomeCommandOutput as CommandHistoryOutput,
  };
}

const Terminal: React.FC<TerminalPropsTypes> = ({ containerRef }) => {
  const [input, setInput] = React.useState("");
  const [commandIndex, setCommandIndex] = React.useState(-1);
  const [inputReady, setInputReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const currentCommandId = React.useRef(0);
  const safetyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const [savedHistory, setSavedHistory, , isHydrated] =
    useLocalStorage<SerializableHistory>(STORAGE_KEY, []);

  const [history, setHistory] = React.useState<CommandHistoryTypes>(() => [
    getWelcomeEntry(),
  ]);

  const hasLoadedFromStorage = React.useRef(false);

  React.useEffect(() => {
    if (!isHydrated || hasLoadedFromStorage.current) return;
    hasLoadedFromStorage.current = true;

    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return;
    }

    if (savedHistory.length > 0) {
      setHistory(savedHistory as CommandHistoryTypes);
    } else {
      setHistory([]);
      setInputReady(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  React.useEffect(() => {
    if (!isHydrated || !hasLoadedFromStorage.current) return;

    const serializable = history
      .map(toSerializable)
      .filter((entry) => entry.output.length > 0)
      .slice(-MAX_HISTORY);

    setSavedHistory(serializable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isHydrated]);

  React.useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, containerRef]);

  const clearSafetyTimer = () => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  };

  const handleCommand = async (command: string) => {
    if (command.trim().toLowerCase() === "clear") {
      setHistory([]);
      setSavedHistory([]);
      setInputReady(true);
      setCommandIndex(-1);
      return;
    }

    const commandId = ++currentCommandId.current;

    setInputReady(false);
    setIsLoading(true);
    clearSafetyTimer();

    safetyTimer.current = setTimeout(() => {
      if (currentCommandId.current === commandId) {
        setIsLoading(false);
        setInputReady(true);
      }
    }, 10000);

    try {
      const commandOutput = await executeCommand(command);

      if (currentCommandId.current !== commandId) return;

      const normalizedOutput = Array.isArray(commandOutput)
        ? commandOutput
        : [commandOutput];

      setHistory((prevState) => [
        ...prevState,
        {
          command,
          output: normalizedOutput as CommandHistoryOutput,
        },
      ]);
    } catch {
      if (currentCommandId.current !== commandId) return;
      setHistory((prevState) => [
        ...prevState,
        {
          command,
          output: [
            {
              id: "error",
              type: "text" as const,
              content: ["Error: command failed. Please try again."],
            },
          ],
        },
      ]);
      setInputReady(true);
    } finally {
      if (currentCommandId.current === commandId) {
        clearSafetyTimer();
        setIsLoading(false);
      }
    }

    setCommandIndex(-1);
  };

  const handleClearTerminal = () => {
    setHistory([]);
    setSavedHistory([]);
    setInputReady(true);
  };

  const handleArrowUp = () => {
    if (commandIndex < history.length - 1) {
      const newCommandIndex = commandIndex + 1;
      const historyIndex = history.length - 1 - newCommandIndex;
      setCommandIndex(newCommandIndex);
      if (historyIndex >= 0 && historyIndex < history.length) {
        return history[historyIndex].command;
      }
    }
    return "";
  };

  const handleArrowDown = () => {
    if (commandIndex > 0) {
      const newCommandIndex = commandIndex - 1;
      const historyIndex = history.length - 1 - newCommandIndex;
      setCommandIndex(newCommandIndex);
      if (historyIndex >= 0 && historyIndex < history.length) {
        return history[historyIndex].command;
      }
    } else if (commandIndex === 0) {
      setCommandIndex(-1);
      return "";
    }
    return "";
  };

  return (
    <div role="application" aria-label="Terminal portfolio de Souleymane Sy">
      <div
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        aria-relevant="additions"
        aria-atomic="false"
      >
        <AnimatePresence>
          {history.map((item: CommandHistory, index: number) => {
            const isLastEntry = index === history.length - 1;

            return (
              <motion.div
                key={`${item.command}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <TerminalPrompt />
                <span className="text-secondary-clr"> {item.command}</span>

                <br />

                {item.output.map((block, i) => {
                  const isLastBlock = i === item.output.length - 1;
                  const handleComplete =
                    isLastEntry && isLastBlock
                      ? () => setInputReady(true)
                      : undefined;

                  return (
                    <CommandOutput
                      key={i}
                      outputTypes={block.type}
                      outputLines={"content" in block ? block.content : []}
                      component={
                        "component" in block ? block.component : undefined
                      }
                      onComplete={handleComplete}
                    />
                  );
                })}
              </motion.div>
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
            aria-label="Processing command..."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <LoadingIndicator variant="braille" />
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
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-hidden="true" style={{ height: "8rem" }} />
    </div>
  );
};

export default Terminal;
