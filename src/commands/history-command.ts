/**
 * history — display recent command history.
 * Reads directly from the terminal's localStorage key.
 *
 * Usage: history [n]   — show last n commands (default 20, max 50)
 */

import { StoredEntryType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { storageGet } from "@/utils/commandStorage";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { HISTORY_HELP } from "@/constants/help/utils";
import { STORAGE_KEYS } from "@/constants/storageKeys";

const STORAGE_KEY = STORAGE_KEYS.COMMAND_HISTORY;

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleHistoryCommand = (args: string[]) => {
  const { flags, positional } = parseArgs(args);

  if (flags.help) return HISTORY_HELP;

  const raw = positional[0];
  const n = raw !== undefined ? parseInt(raw, 10) : 20;

  if (raw !== undefined && isNaN(n)) {
    return createErrorOutput(
      `Invalid argument: <span class="text-tertiary-clr">${raw}</span>`,
      `Usage: <span class="text-tertiary-clr font-bold">history [n]</span> — n must be a number`,
    );
  }

  const count = Math.min(Math.max(1, n), 50);
  const stored = storageGet<StoredEntryType[]>(STORAGE_KEY, []);
  const commands = stored
    .map((e) => e.command)
    .filter((cmd) => cmd && cmd.trim() && cmd !== "^C");

  const slice = commands.slice(-count);

  if (slice.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">History</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>No command history yet. Start typing!</p>
        </div>
      </div>`,
    );
  }

  const offset = commands.length - slice.length;

  const rows = slice
    .map((cmd, i) => {
      const num = String(offset + i + 1).padStart(4, "\u00A0");
      return `<p>
        <span class="text-primary-clr font-bold">${num}</span>
        <span class="text-text-clr">  ${cmd}</span>
      </p>`;
    })
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">
          History
          <span class="text-text-clr opacity-sep">(${slice.length} entries)</span>
        </p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-tertiary-clr font-bold">↑↓</span>
          <span> navigate history</span>
        </p>
      </div>
    </div>`,
  );
};
