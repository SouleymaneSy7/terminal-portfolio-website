/**
 * useCommandHistory — manages terminal history with localStorage persistence.
 *
 * Extracted from Terminal.tsx to keep the component lean and focused
 * only on rendering. All persistence logic lives here.
 */

"use client";

import type {
  CommandHistory,
  CommandHistoryTypes,
  SerializableBlock,
  SerializableEntryType,
  SerializableHistoryType,
} from "@/types";
import * as React from "react";
import useLocalStorage from "./useLocalStorage";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const STORAGE_KEY = STORAGE_KEYS.COMMAND_HISTORY;
const MAX_HISTORY = 50;
const MAX_IN_MEMORY = 200;

function toSerializable(entry: CommandHistory): SerializableEntryType {
  return {
    id: entry.id || crypto.randomUUID(),
    command: entry.command,
    output: entry.output.filter((block): block is SerializableBlock => block.type !== "component"),
  };
}

export function useCommandHistory() {
  const [savedHistory, setSavedHistory, , isHydrated] = useLocalStorage<SerializableHistoryType>(
    STORAGE_KEY,
    [],
  );

  const [history, setHistory] = React.useState<CommandHistoryTypes>([]);
  const hasLoaded = React.useRef(false);

  // ── "Latest value" ref ────────────────────────────────────────
  // Assigned directly in render (not in a useEffect) so the hydration
  // effect always reads the value from the current render cycle.
  // Adding savedHistory to the effect's deps would re-trigger it on
  // every persistence save — exactly what we want to avoid.
  const savedHistoryRef = React.useRef(savedHistory);
  savedHistoryRef.current = savedHistory;

  // ── Hydration from localStorage ───────────────────────────────
  React.useEffect(() => {
    if (!isHydrated || hasLoaded.current) return;
    hasLoaded.current = true;

    if (savedHistoryRef.current.length > 0) {
      setHistory(savedHistoryRef.current as CommandHistoryTypes);
    }
  }, [isHydrated]);

  // ── Persistence on every history change ───────────────────────
  // setSavedHistory comes from useLocalStorage's useCallback([key])
  // — referentially stable, safe to add to deps.
  React.useEffect(() => {
    if (!isHydrated || !hasLoaded.current) return;

    const serializable = history
      .map(toSerializable)
      .filter((e) => e.output.length > 0)
      .slice(-MAX_HISTORY);

    setSavedHistory(serializable);
  }, [history, isHydrated, setSavedHistory]);

  // ── Public API ────────────────────────────────────────────────
  const pushEntry = React.useCallback((entry: CommandHistory) => {
    setHistory((prev) => {
      const next = [...prev, { ...entry, id: crypto.randomUUID() }];
      return next.length > MAX_IN_MEMORY ? next.slice(-MAX_IN_MEMORY) : next;
    });
  }, []);

  // setSavedHistory is stable — no disable needed.
  const clearHistory = React.useCallback(() => {
    setHistory([]);
    setSavedHistory([]);
  }, [setSavedHistory]);

  return { history, pushEntry, clearHistory, isHydrated } as const;
}
