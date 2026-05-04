import type * as React from "react"

// ─────────────────────────────────────────────────────────────────
// OUTPUT BLOCKS
// ─────────────────────────────────────────────────────────────────

/**
 * A single rendered block inside a command's output.
 * "component" blocks are never serialized (they hold React nodes).
 */
export type Block =
  | { id: string; type: "text"; content: string[] }
  | { id: string; type: "html"; content: string[] }
  | { id: string; type: "link"; content: string[][] }
  | { id: string; type: "component"; component: React.ReactNode }

/**
 * Subset of Block that can be JSON-serialized to localStorage.
 * Component blocks are dropped on save and never restored.
 */
export type SerializableBlock =
  | { id: string; type: "text"; content: string[] }
  | { id: string; type: "html"; content: string[] }
  | { id: string; type: "link"; content: string[][] }

// ─────────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────────

export type CommandHistory = {
  command: string
  output: Block[]
  id?: string
}

export type CommandHistoryTypes = CommandHistory[]

export type SerializableEntryType = {
  command: string
  output: SerializableBlock[]
}

export type SerializableHistoryType = SerializableEntryType[]
