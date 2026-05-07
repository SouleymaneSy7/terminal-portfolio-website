/**
 * Central command dispatcher.
 *
 * Resolution order (first match wins):
 *   1. "clear"           — built-in, bypasses everything
 *   2. Alias expansion   — transparently replace with stored expansion
 *   3. COMMAND_REGISTRY  — normal command handlers
 *   4. not-found output  — friendly error
 *
 * Alias resolution is intentionally single-level: after expansion the
 * result is dispatched as-is, never expanded again, preventing loops.
 */

"use client";

import { getAliasMap } from "@/commands/alias-command";
import { CommandHistoryOutputType } from "@/types";
import { COMMAND_REGISTRY } from "./commandRegistry";
import { createHtmlOutput } from "./output/output";

const notFoundOutput = (cmd: string): CommandHistoryOutputType =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p><span class="text-secondary-clr">'${cmd}'</span> command not found.</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">help</span><span aria-hidden="true">'</span> to see all available commands.</p>
      </div>
    </div>`,
  );

export const executeCommand = async (command: string): Promise<CommandHistoryOutputType> => {
  const trimmed = command.trim();
  const [rawCmd, ...args] = trimmed.split(" ");
  const cmd = rawCmd.toLowerCase();

  // ── 1. Built-in clear (no output, Terminal handles this) ──────
  if (cmd === "clear") return [];

  // ── 2. Alias resolution ───────────────────────────────────────
  const aliases = getAliasMap();
  if (cmd in aliases) {
    const expansion = aliases[cmd];
    // Append any extra args the user typed after the alias name.
    // e.g.  `g --help`  with alias `g="github SouleymaneSy7"`
    //   →   `github SouleymaneSy7 --help`
    const expanded = args.length > 0 ? `${expansion} ${args.join(" ")}` : expansion;
    const [expandedCmd, ...expandedArgs] = expanded.trim().split(" ");
    const expandedCmdLower = expandedCmd.toLowerCase();

    // Guard: prevent a resolved alias from hitting another alias or clear
    if (expandedCmdLower === "clear") return [];

    const expandedHandler = COMMAND_REGISTRY[expandedCmdLower];
    return expandedHandler ? expandedHandler(expandedArgs) : notFoundOutput(expandedCmdLower);
  }

  // ── 3. Normal registry lookup ─────────────────────────────────
  const handler = COMMAND_REGISTRY[cmd];
  return handler ? handler(args) : notFoundOutput(cmd);
};
