import { SuggestionsPanelPropsType } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"

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
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-secondary-clr">Suggestions</p>
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
                <p className="hidden text-text-clr opacity-sep md:inline-block" aria-hidden="true">
                  ·
                </p>
                <p className="text-text-clr opacity-sep">{activeDescription}.</p>
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
                  <p aria-hidden="true" className="mb-t-footer font-bold text-secondary-clr">
                    {group.label}
                  </p>
                  <ul role="presentation" className="grid grid-cols-2 gap-x-4">
                    {group.items.map((suggestion, itemIdx) => {
                      const fi = flatIndex(groupIdx, itemIdx)
                      const isActive = fi === activeIndex
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
                              e.preventDefault()
                              onSelect(suggestion)
                            }}
                            className={[
                              "flex w-full cursor-pointer items-center gap-2 text-left transition-colors duration-100",
                              isActive
                                ? "text-secondary-clr"
                                : "text-tertiary-clr hover:text-secondary-clr",
                            ].join(" ")}
                          >
                            <span aria-hidden="true" className="w-3 shrink-0 text-xs">
                              {isActive ? "▶" : " "}
                            </span>
                            <span>{suggestion}</span>
                          </button>
                        </li>
                      )
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
              className="grid w-140 grid-cols-2"
            >
              {completions.map((suggestion, index) => {
                const isActive = index === activeIndex

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
                        e.preventDefault()
                        onSelect(suggestion)
                      }}
                      className={[
                        "flex w-auto cursor-pointer items-center gap-2 text-left transition-colors duration-100",
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
                )
              })}
            </ul>
          )}

          <p
            className="text-text-clr opacity-50"
            aria-label="Keyboard shortcuts: Tab to cycle, arrow keys to navigate, Escape to dismiss"
          >
            <span aria-hidden="true" className="font-bold text-tertiary-clr">
              [Tab]
            </span>
            <span aria-hidden="true" className="opacity-80">
              {" "}
              cycle
            </span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span aria-hidden="true" className="font-bold text-tertiary-clr">
              [↑↓]
            </span>
            <span aria-hidden="true" className="opacity-80">
              {" "}
              navigate
            </span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span aria-hidden="true" className="font-bold text-tertiary-clr">
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
  )
}
