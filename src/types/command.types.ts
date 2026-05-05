import type { Block } from "./terminal.types";

// ─────────────────────────────────────────────────────────────────
// COMMAND HANDLER
// ─────────────────────────────────────────────────────────────────

/** The full output returned by any command handler. */
export type CommandHistoryOutputType = Block[];

/**
 * Shape every command handler must satisfy.
 * Args are the tokens after the command name, already split on spaces.
 */
export type CommandHandlerType = (
  args: string[],
) => CommandHistoryOutputType | Promise<CommandHistoryOutputType>;

// ─────────────────────────────────────────────────────────────────
// SUGGESTIONS
// ─────────────────────────────────────────────────────────────────

export type SuggestionGroupType = {
  label: string;
  items: string[];
};

export interface SuggestionsPanelPropsType {
  show: boolean;
  totalCount: number;
  activeDescription: string;
  groupedSugs: SuggestionGroupType[] | null;
  completions: string[];
  activeIndex: number;
  onSelect: (suggestion: string) => void;
  flatIndex: (groupIdx: number, itemIdx: number) => number;
  listRef: React.RefObject<HTMLUListElement | null>;
}

// ─────────────────────────────────────────────────────────────────
// DATE
// ─────────────────────────────────────────────────────────────────

export interface ParsedDateType {
  date: Date;
  originalFormat: string;
}

// ─────────────────────────────────────────────────────────────────
//  ARGS PARSERS
// ─────────────────────────────────────────────────────────────────

export interface ParsedArgsType {
  command: string;
  subcommand?: string;
  flags: Record<string, boolean>;
  options: Record<string, string>;
  positional: string[];
}

// ─────────────────────────────────────────────────────────────────
// MAN COMMAND
// ─────────────────────────────────────────────────────────────────

export interface ManPageType {
  name: string;
  synopsis: string;
  description: string;
  options?: string;
  examples?: string;
  notes?: string;
  seeAlso?: string[];
}
// ─────────────────────────────────────────────────────────────────
// HISTORY COMMAND
// ─────────────────────────────────────────────────────────────────

export interface StoredEntryType {
  command: string;
  output: unknown[];
}
