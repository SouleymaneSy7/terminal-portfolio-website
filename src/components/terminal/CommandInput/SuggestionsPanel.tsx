import { SuggestionsPanelPropsType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

export const SuggestionsPanel: React.FC<SuggestionsPanelPropsType> = ({
  show,
  totalCount,
  activeDescription,
  groupedSugs,
  completions,
  activeIndex,
  onSelect,
  flatIndex,
  listRef,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="space-y-t-footer"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <p className="text-secondary-clr font-bold">Suggestions</p>
              <p className="text-text-clr opacity-sep" aria-hidden="true">
                ───
              </p>
              <p
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="text-text-clr opacity-sep"
              >
                {totalCount} match{totalCount > 1 ? "es" : ""}
              </p>
            </div>

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

          {groupedSugs ? (
            <ul
              id="cmd-suggestions"
              ref={listRef}
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
                  <ul role="presentation" className="grid grid-cols-2 gap-x-4">
                    {group.items.map((suggestion, itemIdx) => {
                      const fi = flatIndex(groupIdx, itemIdx);
                      const isActive = fi === activeIndex;
                      return (
                        <li
                          key={itemIdx}
                          id={`suggestion-${fi}`}
                          role="option"
                          aria-selected={isActive}
                          data-suggestion
                        >
                          <button
                            type="button"
                            aria-label={`Complete with ${suggestion}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              onSelect(suggestion);
                            }}
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
            <ul
              id="cmd-suggestions"
              ref={listRef}
              role="listbox"
              aria-label="Command completions"
              className="grid grid-cols-2 w-140"
            >
              {completions.map((suggestion, index) => {
                const isActive = index === activeIndex;

                return (
                  <li
                    key={index}
                    id={`suggestion-${index}`}
                    role="option"
                    aria-selected={isActive}
                    data-suggestion
                  >
                    <button
                      type="button"
                      aria-label={`Complete with ${suggestion}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onSelect(suggestion);
                      }}
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

          <p
            className="text-text-clr opacity-50"
            aria-label="Keyboard shortcuts: Tab to cycle, arrow keys to navigate, Escape to dismiss"
          >
            <span aria-hidden="true" className="text-tertiary-clr font-bold">
              [Tab]
            </span>
            <span aria-hidden="true" className="opacity-80">
              {" "}
              cycle
            </span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span aria-hidden="true" className="text-tertiary-clr font-bold">
              [↑↓]
            </span>
            <span aria-hidden="true" className="opacity-80">
              {" "}
              navigate
            </span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span aria-hidden="true" className="text-tertiary-clr font-bold">
              [Esc]
            </span>
            <span aria-hidden="true" className="opacity-80">
              {" "}
              dismiss
            </span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
