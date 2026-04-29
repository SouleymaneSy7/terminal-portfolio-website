/**
 * Central command dispatcher.
 *
 * Resolves a raw command string to its handler in COMMAND_REGISTRY
 * and invokes it. "clear" is handled before the registry lookup
 * because it has no output — it signals Terminal to wipe its history.
 */

"use client";

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

export const executeCommand = async (
  command: string,
): Promise<CommandHistoryOutputType> => {
  const [rawCmd, ...args] = command.trim().split(" ");
  const cmd = rawCmd.toLowerCase();
  if (cmd === "clear") return [];

  const handler = COMMAND_REGISTRY[cmd];
  return handler ? handler(args) : notFoundOutput(cmd);
};
