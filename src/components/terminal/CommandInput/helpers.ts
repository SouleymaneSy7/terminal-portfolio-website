import { FONTS, THEMES } from "@/commands";
import { commands, COMPLETIONS } from "@/constants/commands";
import { FONT_GROUPS, THEME_GROUPS } from "@/constants/suggestions";
import { SuggestionGroupType } from "@/types";

const MAX_SUGGESTIONS = Object.keys(COMPLETIONS.man).length;

export function getCompletions(input: string): string[] {
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

export function getDescription(cmd: string, suggestion: string): string {
  if (cmd === "theme")
    return (THEMES as Record<string, { description: string }>)[suggestion]?.description ?? "";

  if (cmd === "typeface")
    return (FONTS as Record<string, { description: string }>)[suggestion]?.description ?? "";
  return "";
}

export function getGroupedCompletions(cmd: string, partial: string): SuggestionGroupType[] | null {
  let groups: readonly SuggestionGroupType[] | null = null;
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

export function applyCompletion(base: string, completion: string): string {
  if (!base.includes(" ")) return completion + " ";
  const [cmd] = base.split(" ");
  return cmd + " " + completion;
}

export function findReverseMatch(
  history: string[],
  query: string,
  fromIndex: number,
): { command: string; index: number } | null {
  if (!query) return null;
  const q = query.toLowerCase();
  const start = Math.min(fromIndex, history.length - 1);
  for (let i = start; i >= 0; i--) {
    if (history[i].toLowerCase().includes(q)) {
      return { command: history[i], index: i };
    }
  }
  return null;
}
