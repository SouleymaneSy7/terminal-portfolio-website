/**
 * [command-name] — [short one-line description, e.g. "calculate age from a birth date"]
 *
 * [Optional: 2-3 lines explaining behaviour, supported formats,
 *  limitations, or anything a future maintainer should know upfront.]
 *
 * @example
 * ```bash
 * mycommand
 * mycommand <arg>
 * mycommand --flag value
 * mycommand --help
 * ```
 */

// ─────────────────────────────────────────────────────────────────
// INTEGRATION CHECKLIST — complete every step before shipping
// ─────────────────────────────────────────────────────────────────
//
//  1. Rename this file  →  src/commands/mycommand-command.ts
//  2. Rename the handler below  →  handleMycommandCommand
//  3. Write the --help entry  →  src/constants/help/{category}.ts
//     (pick one: system | info | network | utils | fun)
//  4. Write the man page entry  →  src/commands/man/pages/{category}.ts
//  5. Export from commands barrel  →  src/commands/index.ts
//     add:  export * from "./mycommand-command";
//  6. Register the handler  →  src/utils/commandRegistry.ts
//     import:  handleMycommandCommand
//     entry:   mycommand: (args) => handleMycommandCommand(args),
//  7. Add to the command list  →  src/constants/commands.ts
//     add "mycommand" to the commands[] array (keep alphabetical order)
//  8. Add tab completions  →  src/constants/commands.ts  COMPLETIONS map
//     e.g. mycommand: ["--help", "help", "-h", "subcommand-a", "subcommand-b"]
//
// ─────────────────────────────────────────────────────────────────

// ── Help output (uncomment once written in constants/help/{category}.ts)
// import { MYCOMMAND_HELP } from "@/constants/help/utils";

// ── Core — always needed
import type { CommandHistoryOutputType } from "@/types"
import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { createErrorOutput, createHtmlOutput, createSuccessOutput } from "@/utils/output"

// ── Uncomment based on your command's needs:
//
// Async / API calls:
// import axios from "axios";
// import { myService } from "@/services";
//
// localStorage persistence:
// import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";
// import { STORAGE_KEYS } from "@/constants/storageKeys";
//
// React component output (live widgets):
// import * as React from "react";
// import MyWidget from "@/components/ui/MyWidget";
//
// Specific types (add what you need from @/types):
// import type { SomeDataType } from "@/types";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
// Module-level constants only. No magic strings scattered through
// the file — define them here so they're easy to find and change.

// const MAX_ITEMS = 50;
// const STORAGE_KEY = STORAGE_KEYS.MY_KEY;

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
// Pure functions — no side effects, no I/O.
// Keep each function focused on a single transformation.

// function formatSomething(input: string): string {
//   return input.trim().toLowerCase();
// }

// function validateInput(value: string): boolean {
//   return value.length > 0 && value.length <= 100;
// }

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────
// One function per distinct output shape.
// They receive data, return CommandHistoryOutputType — nothing else.
// Never make API calls or access localStorage from here.

/**
 * The main output — shown when the command succeeds.
 * Replace "data: string" with whatever your command computes.
 */
function buildMainOutput(data: string): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Section Title</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-secondary-clr">Label</span>
          ${DT.decorators.arrow}
          <span class="text-tertiary-clr font-bold">${data}</span>
        </p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">mycommand --help</span>${DT.decorators.quote}
          for all options.
        </p>
      </div>

    </div>`,
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

// ════════════════════════════════════════════════════════════════
// CHOOSE ONE PATTERN — delete the others, keep only what you need.
// ════════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────
// PATTERN 1 — Synchronous, single-action command
// Examples in this codebase: color, echo, cowsay, uuid
// ────────────────────────────────────────────────

export const handleMycommandCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags, positional } = parseArgs(args)

  // if (flags.help) return MYCOMMAND_HELP;

  // Guard: require at least one argument
  if (positional.length === 0) {
    return createErrorOutput(
      "Missing required argument.",
      `Usage: <span class="text-tertiary-clr font-bold">mycommand &lt;value&gt;</span>`,
    )
  }

  const input = positional.join(" ").trim()

  // Validate input if needed
  // if (!validateInput(input)) {
  //   return createErrorOutput(
  //     `Invalid value: <span class="text-tertiary-clr">"${input}"</span>`,
  //     `Expected: ...`,
  //   );
  // }

  return buildMainOutput(input)
}

// ────────────────────────────────────────────────
// PATTERN 2 — Asynchronous command (API call)
// Examples in this codebase: github, weather, ip, joke, quote, convert
//
// Rules:
//   - All HTTP logic lives in src/services/mycommand.service.ts
//   - The handler only calls the service and maps the result to output
//   - Catch AxiosErrors separately for typed status-code handling
//   - Always return a user-facing message on failure — never throw
// ────────────────────────────────────────────────

// export const handleMycommandCommand = async (
//   args: string[],
// ): Promise<CommandHistoryOutputType> => {
//   const { flags, positional } = parseArgs(args);
//
//   // if (flags.help) return MYCOMMAND_HELP;
//
//   const input = positional.join(" ").trim();
//
//   if (!input) {
//     return createErrorOutput(
//       `Usage: <span class="text-tertiary-clr font-bold">mycommand &lt;value&gt;</span>`,
//     );
//   }
//
//   try {
//     const result = await myService.fetchSomething(input);
//     return buildMainOutput(result.data);
//   } catch (err) {
//     // Discriminate on AxiosError for typed HTTP error handling:
//     // if (axios.isAxiosError(err)) {
//     //   if (err.response?.status === 404) return createErrorOutput(`Not found: ${input}`);
//     //   if (err.response?.status === 429) return createErrorOutput("Rate limit reached. Try again later.");
//     //   if (err.code === "ECONNABORTED")  return createErrorOutput("Request timed out.");
//     // }
//     const msg = err instanceof Error ? err.message : "Service unavailable.";
//     return createErrorOutput(msg);
//   }
// };

// ────────────────────────────────────────────────
// PATTERN 3 — Subcommand-based command (CRUD style)
// Examples in this codebase: note, todo, snippet
//
// Rules:
//   - Each subcommand is its own function (list, add, remove, clear…)
//   - The main handler is a pure dispatcher — no logic of its own
//   - parsed.subcommand is always positional[0] (set by parseArgs)
//   - Use storageGet / storageSet / storageRemove — never raw localStorage
// ────────────────────────────────────────────────

// const STORAGE_KEY = STORAGE_KEYS.MY_KEY;

// const getItems  = () => storageGet<MyItemType[]>(STORAGE_KEY, []);
// const saveItems = (items: MyItemType[]) => storageSet(STORAGE_KEY, items);

// const listItems = (): CommandHistoryOutputType => { ... };
// const addItem   = (text: string): CommandHistoryOutputType => { ... };
// const removeItem = (id: string): CommandHistoryOutputType => { ... };
// const clearItems = (): CommandHistoryOutputType => {
//   storageRemove(STORAGE_KEY);
//   return createSuccessOutput("All items deleted.");
// };

// export const handleMycommandCommand = (
//   args: string[],
// ): CommandHistoryOutputType => {
//   const parsed = parseArgs(args);
//   const sub = parsed.subcommand?.toLowerCase();
//
//   // if (parsed.flags.help) return MYCOMMAND_HELP;
//
//   if (!sub || sub === "list") return listItems();
//   if (sub === "clear")        return clearItems();
//   if (sub === "add")          return addItem(parsed.positional.slice(1).join(" "));
//   if (sub === "rm" || sub === "remove" || sub === "delete") {
//     return removeItem(parsed.positional[1]?.toLowerCase() ?? "");
//   }
//
//   return createErrorOutput(
//     `Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span>`,
//     `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">mycommand --help</span>${DT.decorators.quote} for all commands.`,
//   );
// };

// ────────────────────────────────────────────────
// PATTERN 4 — React component output (live widget)
// Examples in this codebase: timer, date, time
//
// Rules:
//   - Component blocks are never serialized to localStorage
//   - Use a unique key so React re-mounts on repeated invocations
//   - The component itself manages its own state (intervals, timers…)
//   - Keep validation logic here — the component receives clean props
// ────────────────────────────────────────────────

// export const handleMycommandCommand = (
//   args: string[],
// ): CommandHistoryOutputType => {
//   const parsed = parseArgs(args);
//
//   // if (parsed.flags.help) return MYCOMMAND_HELP;
//
//   const input = parsed.positional[0];
//
//   if (!input) {
//     return createErrorOutput(
//       "Missing required argument.",
//       `Usage: <span class="text-tertiary-clr font-bold">mycommand &lt;value&gt;</span>`,
//     );
//   }
//
//   return [
//     {
//       id: crypto.randomUUID(),
//       type: "component" as const,
//       component: React.createElement(MyWidget, {
//         value: input,
//         key: `mycommand-${Date.now()}`,
//       }),
//     },
//   ];
// };
