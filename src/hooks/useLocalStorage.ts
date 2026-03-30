"use client";

import * as React from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [
  value: T,
  setValue: (value: T | ((prev: T) => T)) => void,
  clearValue: () => void,
  isHydrated: boolean,
] {
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setStoredValue(JSON.parse(raw) as T);
      }
    } catch (error) {
      console.error(`[useLocalStorage] Failed to get key "${key}":`, error);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const next =
            typeof value === "function"
              ? (value as (prev: T) => T)(prev)
              : value;

          try {
            window.localStorage.setItem(key, JSON.stringify(next));
          } catch (err) {
            console.error(
              `[useLocalStorage] Failed to write key "${key}":`,
              err,
            );
          }

          return next;
        });
      } catch (error) {
        console.error(
          `[useLocalStorage] setValue error for key "${key}":`,
          error,
        );
      }
    },
    [key],
  );

  const clearValue = React.useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`[useLocalStorage] Failed to clear key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, clearValue, isHydrated] as const;
}

export default useLocalStorage;
