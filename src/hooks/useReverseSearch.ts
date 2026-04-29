import { findReverseMatch } from "@/components/terminal/CommandInput/helpers";
import * as React from "react";

export function useReverseSearch(
  commandHistory: string[],
  setInput: (value: string) => void,
) {
  const [isActive, setIsActive] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [fromIndex, setFromIndex] = React.useState(-1);
  const savedInputRef = React.useRef<string>("");

  const match = React.useMemo(() => {
    if (!isActive || !query) return null;
    const from = fromIndex === -1 ? commandHistory.length - 1 : fromIndex;
    return findReverseMatch(commandHistory, query, from);
  }, [isActive, query, fromIndex, commandHistory]);

  React.useEffect(() => {
    if (!isActive) return;
    setInput(match ? match.command : "");
  }, [match, isActive, setInput]);

  const enter = React.useCallback(
    (currentInput: string) => {
      savedInputRef.current = currentInput;
      setIsActive(true);
      setQuery("");
      setFromIndex(commandHistory.length - 1);
    },
    [commandHistory.length],
  );

  const exit = React.useCallback(
    (restoreInput?: string) => {
      setIsActive(false);
      setQuery("");
      setFromIndex(-1);
      if (restoreInput !== undefined) {
        setInput(restoreInput);
      }
    },
    [setInput],
  );

  const cycleNext = React.useCallback(() => {
    if (match) {
      setFromIndex(match.index - 1);
    }
  }, [match]);

  const updateQuery = React.useCallback((newQuery: string) => {
    setQuery(newQuery);
    setFromIndex(-1);
  }, []);

  return {
    isActive,
    query,
    match,
    savedInput: savedInputRef.current,
    enter,
    exit,
    cycleNext,
    updateQuery,
  };
}
