/**
 * [command-name] — [short one-line description]
 *
 * [Optional: more detail about what the command does,
 *  supported formats, edge cases, etc.]
 *
 * @example
 * ```bash
 * command <arg>
 * command --option value
 * command --help
 * ```
 */

// import { COMMAND_HELP } from "@/constants/help/[category]";  system | info | network | utils | fun
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

// const EXAMPLE_MAP: Record<string, string> = { ... };

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

// Pure functions — no side effects, no I/O

// function helperFn(input: string): string {
//   return input;
// }

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function buildCommandOutput(data: string): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Section Title</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Label</span>${DT.decorators.arrow}<span class="text-tertiary-clr font-bold">${data}</span></p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">command --help</span>${DT.decorators.quote} for more options.</p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleCommandCommand = (
  args: string[],
): CommandHistoryOutputType => {
  const { flags, positional } = parseArgs(args);

  // if (flags.help) return COMMAND_HELP;

  if (positional.length === 0) {
    return createErrorOutput(
      "Missing required argument.",
      `Type <span class="text-tertiary-clr font-bold">command --help</span> for usage and examples.`,
    );
  }

  const input = positional.join(" ").trim();

  return buildCommandOutput(input);
};
