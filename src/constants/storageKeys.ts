/**
 * Centralized localStorage keys for the terminal.
 * Single source of truth to prevent typos and key collisions.
 */

export const STORAGE_KEYS = {
  // Terminal state
  COMMAND_HISTORY: "terminal:command-history",
  THEME: "terminal:theme",
  FONT: "terminal:font",

  // Persistent data
  NOTES: "terminal:notes",
  TODOS: "terminal:todos",
  SNIPPETS: "terminal:snippets",

  // Quiz game
  QUIZ_GAME: "terminal:quiz-game",

  // Audio
  AUDIO: "terminal:audio",

  // Aliases
  ALIASES: "terminal:aliases",
} as const;

export type StorageKeyType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
