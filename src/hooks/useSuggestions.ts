import { useDebounce } from "@/hooks";
import * as React from "react";
import {
  applyCompletion,
  getCompletions,
  getDescription,
  getGroupedCompletions,
} from "../components/terminal/CommandInput/helpers";

export function useSuggestions(input: string, setInput: (value: string) => void) {
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [savedInput, setSavedInput] = React.useState<string>("");
  const navigatingRef = React.useRef(false);

  // Debounce input for expensive completion calculations
  const debouncedInput = useDebounce(input, 150);

  React.useEffect(() => {
    if (navigatingRef.current) {
      navigatingRef.current = false;
      return;
    }
    setActiveIndex(-1);
    setSavedInput("");
  }, [debouncedInput]);

  const baseInput = savedInput || debouncedInput;
  const completions = React.useMemo(() => getCompletions(baseInput), [baseInput]);

  const hasSpace = baseInput.includes(" ");
  const cmdName = hasSpace ? baseInput.split(" ")[0].toLowerCase() : "";
  const partialArg = hasSpace ? baseInput.split(" ").slice(1).join(" ").toLowerCase() : "";

  const groupedSugs = React.useMemo(
    () => (hasSpace ? getGroupedCompletions(cmdName, partialArg) : null),
    [hasSpace, cmdName, partialArg],
  );

  const flatGrouped = React.useMemo(
    () => (groupedSugs ? groupedSugs.flatMap((g) => g.items) : null),
    [groupedSugs],
  );

  const totalCount = flatGrouped ? flatGrouped.length : completions.length;

  const activeDescription = React.useMemo((): string => {
    if (activeIndex < 0 || !cmdName) return "";
    const list = flatGrouped ?? completions;
    const active = list[activeIndex];
    if (!active) return "";
    return getDescription(cmdName, active);
  }, [activeIndex, cmdName, completions, flatGrouped]);

  const move = React.useCallback(
    (delta: 1 | -1, scrollContainer?: HTMLUListElement | null) => {
      const list = flatGrouped ?? completions;
      if (list.length === 0) return;

      // Capture base synchronously — setSavedInput is async so we cannot rely
      // on savedInput having the new value when setInput is called right after.
      const base = savedInput !== "" ? savedInput : input;
      if (savedInput === "") setSavedInput(input);

      const next = activeIndex + delta;
      const clamped = next < -1 ? list.length - 1 : next >= list.length ? -1 : next;

      setActiveIndex(clamped);
      navigatingRef.current = true;
      setInput(clamped === -1 ? base : applyCompletion(base, list[clamped]));

      setTimeout(() => {
        if (scrollContainer && clamped >= 0) {
          const allItems = scrollContainer.querySelectorAll("[data-suggestion]");
          (allItems[clamped] as HTMLElement)?.scrollIntoView({
            block: "nearest",
          });
        }
      }, 0);
    },
    [activeIndex, completions, flatGrouped, input, savedInput, setInput],
  );

  const select = React.useCallback(
    (suggestion: string) => {
      navigatingRef.current = true;
      setInput(applyCompletion(savedInput || input, suggestion));
      setSavedInput("");
      setActiveIndex(-1);
    },
    [input, savedInput, setInput],
  );

  const reset = React.useCallback(() => {
    if (savedInput) {
      navigatingRef.current = true;
      setInput(savedInput);
      setSavedInput("");
    }
    setActiveIndex(-1);
  }, [savedInput, setInput]);

  const completeUnique = React.useCallback(() => {
    const list = flatGrouped ?? completions;
    if (list.length === 1) {
      navigatingRef.current = true;
      setInput(applyCompletion(savedInput || input, list[0]));
      setSavedInput("");
      setActiveIndex(-1);
      return true;
    }
    return false;
  }, [completions, flatGrouped, input, savedInput, setInput]);

  const flatIndex = React.useCallback(
    (groupIdx: number, itemIdx: number): number => {
      if (!groupedSugs) return itemIdx;
      let count = 0;
      for (let g = 0; g < groupIdx; g++) count += groupedSugs[g].items.length;
      return count + itemIdx;
    },
    [groupedSugs],
  );

  return {
    completions,
    groupedSugs,
    flatGrouped,
    totalCount,
    activeIndex,
    activeDescription,
    cmdName,
    move,
    select,
    reset,
    completeUnique,
    flatIndex,
  };
}
