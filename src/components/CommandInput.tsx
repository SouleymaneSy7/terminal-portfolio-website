"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

import { FONTS, THEMES } from "@/commands/theme-command";
import { commands, COMPLETIONS } from "@/constants";
import { CommandInputPropsType, SuggestionGroupType } from "@/types";
import TerminalPrompt from "./TerminalPrompt";

const INTERACTIVE_SELECTOR =
  'a[href], button:not([disabled]), input, textarea, select, [role="button"]';

const MAX_SUGGESTIONS = Object.keys(THEMES).length;

const THEME_GROUPS: SuggestionGroupType[] = [
  {
    label: "Catppuccin",
    items: [
      "catppuccin",
      "catppuccin-latte",
      "catppuccin-frappe",
      "catppuccin-mocha",
    ],
  },
  {
    label: "Popular Dark",
    items: [
      "monokai",
      "tokyo-night",
      "dracula",
      "nord",
      "gruvbox",
      "everforest",
      "rose-pine",
    ],
  },
  {
    label: "Editor Classics",
    items: [
      "solarized-dark",
      "oceanic",
      "cobalt2",
      "github",
      "one-dark",
      "atom-one-dark",
    ],
  },
  {
    label: "Material",
    items: [
      "material-default",
      "material-lighter",
      "material-oceanic",
      "material-palenight",
      "material-deep-ocean",
      "material-high-contrast",
    ],
  },
  {
    label: "Others",
    items: [
      "ayu-dark",
      "night-owl",
      "synthwave",
      "kanagawa",
      "horizon",
      "poimandres",
      "vesper",
      "hack-the-box",
    ],
  },
];

const FONT_GROUPS: SuggestionGroupType[] = [
  {
    label: "Available Fonts",
    items: ["cascadia", "fira", "geist", "recursive-casual"],
  },
];

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

function getCompletions(input: string): string[] {
  if (!input) return [];

  const hasSpace = input.includes(" ");

  if (!hasSpace) {
    const partial = input.toLowerCase();
    return commands
      .filter((cmd) => cmd.startsWith(partial) && cmd !== partial)
      .slice(0, MAX_SUGGESTIONS);
  }

  const [rawCmd, ...rest] = input.split(" ");
  const cmd = rawCmd.toLowerCase();
  const argPool = COMPLETIONS[cmd];

  if (!argPool || argPool.length === 0) return [];

  const partial = rest.join(" ").toLowerCase();
  if (!partial) return argPool.slice(0, MAX_SUGGESTIONS);

  return argPool
    .filter((arg) => arg.startsWith(partial) && arg !== partial)
    .slice(0, MAX_SUGGESTIONS);
}

function getDescription(cmd: string, suggestion: string): string {
  if (cmd === "theme") {
    return (
      (THEMES as Record<string, { description: string }>)[suggestion]
        ?.description ?? ""
    );
  }
  if (cmd === "typeface") {
    return (
      (FONTS as Record<string, { description: string }>)[suggestion]
        ?.description ?? ""
    );
  }
  return "";
}

function getGroupedCompletions(
  cmd: string,
  partial: string,
): SuggestionGroupType[] | null {
  let groups: SuggestionGroupType[] | null = null;

  if (cmd === "theme") groups = THEME_GROUPS;
  if (cmd === "typeface") groups = FONT_GROUPS;

  if (!groups) return null;

  return groups
    .map((group) => ({
      label: group.label,
      items: group.items.filter((item) =>
        partial ? item.startsWith(partial) && item !== partial : true,
      ),
    }))
    .filter((group) => group.items.length > 0);
}

function applyCompletion(base: string, completion: string): string {
  if (!base.includes(" ")) return completion + " ";
  const [cmd] = base.split(" ");
  return cmd + " " + completion;
}

// ─────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────
const CommandInput: React.FC<CommandInputPropsType> = ({
  input,
  setInput,
  onArrowUp,
  onArrowDown,
  onCommandType,
  onClearTerminal,
}) => {
  const commandInputRef = React.useRef<HTMLInputElement>(null);
  const suggestionListRef = React.useRef<HTMLUListElement>(null);

  const [isFocused, setIsFocused] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const savedInputRef = React.useRef<string>("");
  const navigatingRef = React.useRef(false);

  // ── Reset navigation when the user types freely ───────────────
  React.useEffect(() => {
    if (navigatingRef.current) {
      navigatingRef.current = false;
      return;
    }
    setActiveIndex(-1);
    savedInputRef.current = "";
  }, [input]);

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

  // ── Derived ───────────────────────────────────────────────────
  const baseInput = savedInputRef.current || input;
  const completions = getCompletions(baseInput);
  const showPanel = completions.length > 1 && isFocused;

  // Detect whether we're in a grouped-display command
  const hasSpace = baseInput.includes(" ");
  const cmdName = hasSpace ? baseInput.split(" ")[0].toLowerCase() : "";
  const partialArg = hasSpace
    ? baseInput.split(" ").slice(1).join(" ").toLowerCase()
    : "";
  const groupedSugs = hasSpace
    ? getGroupedCompletions(cmdName, partialArg)
    : null;

  // Flat ordered list matching the grouped display (for keyboard navigation)
  const flatGrouped = groupedSugs ? groupedSugs.flatMap((g) => g.items) : null;

  // Description for the currently active suggestion
  const activeDescription = React.useMemo((): string => {
    if (activeIndex < 0 || !cmdName) return "";
    const list = flatGrouped ?? completions;
    const active = list[activeIndex];
    if (!active) return "";
    return getDescription(cmdName, active);
  }, [activeIndex, cmdName, completions, flatGrouped]);

  // Total suggestions count (flat)
  const totalCount = flatGrouped ? flatGrouped.length : completions.length;

  // ── Navigation ────────────────────────────────────────────────
  const moveSuggestion = React.useCallback(
    (delta: 1 | -1) => {
      const list = flatGrouped ?? completions;
      if (list.length === 0) return;

      if (savedInputRef.current === "") {
        savedInputRef.current = input;
      }

      const next = activeIndex + delta;
      const clamped =
        next < -1 ? list.length - 1 : next >= list.length ? -1 : next;

      setActiveIndex(clamped);
      navigatingRef.current = true;

      setInput(
        clamped === -1
          ? savedInputRef.current
          : applyCompletion(savedInputRef.current, list[clamped]),
      );

      // Scroll active item into view
      setTimeout(() => {
        if (suggestionListRef.current && clamped >= 0) {
          const allItems =
            suggestionListRef.current.querySelectorAll("[data-suggestion]");
          (allItems[clamped] as HTMLElement)?.scrollIntoView({
            block: "nearest",
          });
        }
      }, 0);
    },
    [activeIndex, completions, flatGrouped, input, setInput],
  );

  // ── Handlers ─────────────────────────────────────────────────
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleCommandSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      onCommandType(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      onClearTerminal();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (savedInputRef.current) {
        navigatingRef.current = true;
        setInput(savedInputRef.current);
        savedInputRef.current = "";
      }
      setActiveIndex(-1);
      setTimeout(() => commandInputRef.current?.focus(), 0);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      showPanel
        ? moveSuggestion(-1)
        : (() => {
            const cmd = onArrowUp();
            if (cmd) setInput(cmd);
          })();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      showPanel ? moveSuggestion(1) : setInput(onArrowDown());
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const list = flatGrouped ?? completions;
      if (list.length === 0) return;
      if (list.length === 1) {
        navigatingRef.current = true;
        setInput(applyCompletion(savedInputRef.current || input, list[0]));
        savedInputRef.current = "";
        setActiveIndex(-1);
        return;
      }
      moveSuggestion(1);
    }
  };

  const handleSuggestionMouseDown = (
    event: React.MouseEvent,
    suggestion: string,
  ) => {
    event.preventDefault();

    navigatingRef.current = true;
    setInput(applyCompletion(savedInputRef.current || input, suggestion));

    savedInputRef.current = "";
    setActiveIndex(-1);
    commandInputRef.current?.focus();
  };

  // ── Flat index helper for grouped display ─────────────────────
  // Computes the flat index of an item across all groups so we can
  // map it to activeIndex for highlighting.
  const flatIndex = (groupIdx: number, itemIdx: number): number => {
    if (!groupedSugs) return itemIdx;
    let count = 0;
    for (let g = 0; g < groupIdx; g++) count += groupedSugs[g].items.length;
    return count + itemIdx;
  };

  return (
    <div className="space-y-t-group">
      <div className="flex items-baseline flex-wrap gap-2">
        <label htmlFor="command-input" className="shrink-0">
          <TerminalPrompt />
        </label>

        <div className="flex-1 min-w-0 relative">
          <form onSubmit={handleCommandSubmit}>
            <input
              id="command-input"
              autoFocus
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
              aria-label="Enter terminal command"
              aria-autocomplete="list"
              aria-expanded={showPanel}
              aria-activedescendant={
                activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
              }
              aria-controls={showPanel ? "cmd-suggestions" : undefined}
              className="w-full outline-none border-none text-secondary-clr bg-transparent relative z-10"
              style={{ caretColor: "transparent" }}
            />
          </form>

          {isFocused && (
            <motion.span
              aria-hidden="true"
              className="inline-block w-2 h-full bg-secondary-clr absolute top-1.75 -translate-y-1/2 pointer-events-none"
              style={{
                left: `calc(${input.length}ch)`,
              }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
      </div>

      {/* Suggestions panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            className="space-y-t-footer"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="text-secondary-clr font-bold">Suggestions</p>
                <p className="text-text-clr opacity-sep" aria-hidden="true">
                  ───
                </p>

                <p className="text-text-clr opacity-sep">
                  {totalCount} match{totalCount > 1 ? "es" : ""}
                </p>
              </div>

              {/* Description of active item */}
              {activeDescription && (
                <React.Fragment>
                  <p
                    className="hidden md:inline-block text-text-clr opacity-sep"
                    aria-hidden="true"
                  >
                    ·
                  </p>
                  <p className="text-text-clr opacity-sep">
                    {activeDescription}.
                  </p>
                </React.Fragment>
              )}
            </div>

            {/* Grouped display (theme / typeface) */}
            {groupedSugs ? (
              <ul
                id="cmd-suggestions"
                ref={suggestionListRef}
                role="listbox"
                aria-label="Command completions"
                className="space-y-t-group"
              >
                {groupedSugs.map((group, groupIdx) => (
                  <li key={group.label} role="presentation">
                    <p
                      aria-hidden="true"
                      className="text-secondary-clr font-bold mb-t-footer"
                    >
                      {group.label}
                    </p>

                    {/* Items in 2-col grid */}
                    <ul
                      role="presentation"
                      className="grid grid-cols-2 gap-x-4"
                    >
                      {group.items.map((suggestion, itemIdx) => {
                        const fi = flatIndex(groupIdx, itemIdx);
                        const isActive = fi === activeIndex;

                        return (
                          <li
                            key={suggestion}
                            id={`suggestion-${fi}`}
                            role="option"
                            aria-selected={isActive}
                            data-suggestion
                          >
                            <button
                              type="button"
                              onMouseDown={(e) =>
                                handleSuggestionMouseDown(e, suggestion)
                              }
                              className={[
                                "flex items-center gap-2 w-full text-left transition-colors duration-100 cursor-pointer",
                                isActive
                                  ? "text-secondary-clr"
                                  : "text-tertiary-clr hover:text-secondary-clr",
                              ].join(" ")}
                            >
                              <span
                                aria-hidden="true"
                                className="w-3 shrink-0 text-xs"
                              >
                                {isActive ? "▶" : " "}
                              </span>
                              <span>{suggestion}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              /* Flat display (commands, rps, game) */
              <ul
                id="cmd-suggestions"
                ref={suggestionListRef}
                role="listbox"
                aria-label="Command completions"
                className="grid grid-cols-2 w-140"
              >
                {completions.map((suggestion, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <li
                      key={suggestion}
                      id={`suggestion-${index}`}
                      role="option"
                      aria-selected={isActive}
                      data-suggestion
                    >
                      <button
                        type="button"
                        onMouseDown={(e) =>
                          handleSuggestionMouseDown(e, suggestion)
                        }
                        className={[
                          "flex items-center gap-2 w-auto text-left transition-colors duration-100 cursor-pointer",
                          isActive
                            ? "text-secondary-clr"
                            : "text-tertiary-clr hover:text-secondary-clr",
                        ].join(" ")}
                      >
                        <span aria-hidden="true" className="w-3 shrink-0">
                          {isActive ? "▶" : " "}
                        </span>
                        <span>{suggestion}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <p className="text-text-clr opacity-50" aria-hidden="true">
              <span className="text-tertiary-clr font-bold">[Tab]</span>
              <span className="opacity-80"> cycle</span>
              <span className="mx-2">·</span>
              <span className="text-tertiary-clr font-bold">[↑↓]</span>
              <span className="opacity-80"> navigate</span>
              <span className="mx-2">·</span>
              <span className="text-tertiary-clr font-bold">[Esc]</span>
              <span className="opacity-80"> dismiss</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommandInput;
