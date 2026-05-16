/**
 * CommandInput — terminal input bar with tab completion,
 * grouped suggestion panel, command history navigation,
 * Ctrl+R reverse search, and Ctrl+L clear.
 *
 * Refactored structure:
 * - Helpers extracted to helpers.ts
 * - Reverse search logic in useReverseSearch hook
 * - Suggestions logic in useSuggestions hook
 * - SuggestionsPanel as separate component
 */

"use client";

import { motion } from "framer-motion";
import * as React from "react";

import { useReverseSearch, useSuggestions } from "@/hooks";
import { CommandInputPropsType } from "@/types";
import TerminalPrompt from "../TerminalPrompt";
import { SuggestionsPanel } from "./SuggestionsPanel";
import { useAudio } from "@/hooks/useAudio";

const INTERACTIVE_SELECTOR =
  'a[href], button:not([disabled]), input, textarea, select, [role="button"]';

const CommandInput: React.FC<CommandInputPropsType> = ({
  input,
  setInput,
  onArrowUp,
  onArrowDown,
  onCommandType,
  onClearTerminal,
  commandHistory,
}) => {
  const { play } = useAudio();

  const commandInputRef = React.useRef<HTMLInputElement>(null);
  const suggestionListRef = React.useRef<HTMLUListElement>(null);

  const [isFocused, setIsFocused] = React.useState(true);

  const reverseSearch = useReverseSearch(commandHistory, setInput);
  const suggestions = useSuggestions(input, setInput);

  const prefersReducedMotion = React.useMemo(
    () =>
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    [],
  );

  const showPanel = suggestions.completions.length > 1 && isFocused && !reverseSearch.isActive;

  // ── Initial focus ─────────────────────────────────────────────
  React.useEffect(() => {
    commandInputRef.current?.focus();
  }, []);

  // ── Re-focus on bare click ────────────────────────────────────
  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) return;
      commandInputRef.current?.focus();
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (reverseSearch.isActive) return;
    setInput(event.target.value);
  };

  const handleCommandSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reverseSearch.isActive) {
      const accepted = reverseSearch.match?.command ?? "";
      reverseSearch.exit();
      if (accepted) {
        onCommandType(accepted);
        setInput("");
      }
      return;
    }

    if (input.trim()) {
      onCommandType(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey) {
      play("ctrl");
    } else if (event.key === "Enter") {
      play("enter");
    } else if (event.key === "Backspace" || event.key === "Delete") {
      play("backspace");
    } else if (event.key === "Tab") {
      play("tab");
    } else if (event.key === "Escape") {
      play("escape");
    } else if (event.key.length === 1) {
      play("keypress");
    }

    // ── Ctrl+L — clear ──────────────────────────────────────────
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      onClearTerminal();
      return;
    }

    // ── Ctrl+R — enter / cycle reverse search ───────────────────
    if (event.ctrlKey && event.key.toLowerCase() === "r") {
      event.preventDefault();

      if (!reverseSearch.isActive) {
        reverseSearch.enter(input);
      } else {
        reverseSearch.cycleNext();
      }
      return;
    }

    // ── Inside reverse search ────────────────────────────────────
    if (reverseSearch.isActive) {
      if (event.key === "Escape") {
        event.preventDefault();
        reverseSearch.exit(reverseSearch.savedInput);
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        reverseSearch.updateQuery(reverseSearch.query.slice(0, -1));
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        reverseSearch.exit(reverseSearch.match?.command);
        return;
      }

      if (event.key === "Enter") {
        return;
      }

      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        reverseSearch.updateQuery(reverseSearch.query + event.key);
        return;
      }

      reverseSearch.exit(reverseSearch.savedInput);
      return;
    }

    // ── Normal mode ──────────────────────────────────────────────
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      suggestions.reset();
      setTimeout(() => commandInputRef.current?.focus(), 0);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (showPanel) {
        suggestions.move(-1, suggestionListRef.current);
      } else {
        const cmd = onArrowUp();
        if (cmd) setInput(cmd);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (showPanel) {
        suggestions.move(1, suggestionListRef.current);
      } else {
        setInput(onArrowDown());
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      if (suggestions.completeUnique()) return;
      suggestions.move(1, suggestionListRef.current);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    suggestions.select(suggestion);
    commandInputRef.current?.focus();
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-t-group">
      {/* Reverse search prompt */}
      {reverseSearch.isActive && (
        <p className="text-text-clr opacity-dim" aria-live="polite" aria-atomic="true">
          <span className="text-secondary-clr">(reverse-i-search)</span>
          <span className="text-text-clr">'{reverseSearch.query}'</span>
          <span className="text-text-clr opacity-dim">: </span>
          {reverseSearch.match ? (
            <span className="text-tertiary-clr">{reverseSearch.match.command}</span>
          ) : reverseSearch.query ? (
            <span className="text-secondary-clr opacity-dim">(no match)</span>
          ) : (
            <span className="text-text-clr opacity-dim">type to search…</span>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-baseline gap-2">
        <label htmlFor="command-input" className="shrink-0">
          <TerminalPrompt />
        </label>

        <div className="relative min-w-0 flex-1">
          <form onSubmit={handleCommandSubmit} aria-label="Terminal command input">
            <input
              id="command-input"
              autoFocus
              role="combobox"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              type="text"
              value={input}
              ref={commandInputRef}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-haspopup="listbox"
              aria-label={
                reverseSearch.isActive
                  ? `Reverse search: ${reverseSearch.query || "type to search"}`
                  : "Enter terminal command"
              }
              aria-autocomplete={reverseSearch.isActive ? undefined : "list"}
              aria-expanded={showPanel}
              aria-activedescendant={
                suggestions.activeIndex >= 0 ? `suggestion-${suggestions.activeIndex}` : undefined
              }
              aria-controls={showPanel ? "cmd-suggestions" : undefined}
              className="relative z-10 w-full border-none bg-transparent text-secondary-clr outline-none"
              style={{ caretColor: "transparent" }}
            />
          </form>

          {/* Blinking cursor */}
          {isFocused &&
            !reverseSearch.isActive &&
            (prefersReducedMotion ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1.75 inline-block h-full w-2 -translate-y-1/2 bg-secondary-clr"
                style={{ left: `calc(${input.length}ch)` }}
              />
            ) : (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute top-1.75 inline-block h-full w-2 -translate-y-1/2 bg-secondary-clr"
                style={{ left: `calc(${input.length}ch)` }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ))}
        </div>
      </div>

      {/* Suggestions panel */}
      <SuggestionsPanel
        show={showPanel}
        totalCount={suggestions.totalCount}
        activeDescription={suggestions.activeDescription}
        groupedSugs={suggestions.groupedSugs}
        completions={suggestions.completions}
        activeIndex={suggestions.activeIndex}
        onSelect={handleSuggestionSelect}
        flatIndex={suggestions.flatIndex}
        listRef={suggestionListRef}
      />
    </div>
  );
};

export default CommandInput;
