/**
 * calc <expression> — evaluate a mathematical expression.
 *
 * Uses math.js for safe, sandboxed evaluation.
 * Supports arithmetic, algebra, trigonometry, units, matrices, and more.
 * All computation runs locally in the browser — no data is sent anywhere.
 */

import { CALC_HELP } from "@/constants/help/utils";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { format } from "mathjs";

/** Maximum characters in the formatted result before truncating */
const MAX_RESULT_LENGTH = 500;

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

/** Format a math.js result value to a readable string */
function formatResult(value: unknown) {
  if (value === null || value === undefined) return "null";

  const str = format(value, { precision: 14, notation: "auto" });

  return str.length > MAX_RESULT_LENGTH ? str.slice(0, MAX_RESULT_LENGTH) + "…" : str;
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────
export const handleCalcCommand = async (args: string[]) => {
  const { evaluate } = await import("mathjs");
  const { flags, positional } = parseArgs(args);

  if (flags.help) return CALC_HELP;

  if (positional.length === 0) {
    return createErrorOutput(
      "No expression provided.",
      `Type <span class="text-tertiary-clr font-bold">calc --help</span> for usage and examples.`,
    );
  }

  // Rejoin all positional args — allows expressions with spaces like "2 + 2" or "5 km to m"
  const expression = positional.join(" ").trim();

  try {
    // math.js evaluate() is sandboxed: no access to globals, filesystem, or network.
    const result = evaluate(expression);
    const formatted = formatResult(result);

    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Result</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p class="text-text-clr opacity-dim">${expression}</p>
          <p><span aria-hidden="true" class="text-tertiary-clr"> =</span>  <span class="text-tertiary-clr font-bold text-fs-subtitle">${formatted}</span></p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p class="text-text-clr opacity-dim">Powered by <span class="text-tertiary-clr">math.js</span> — runs entirely in the browser, nothing is sent over the network.</p>
          <p class="text-text-clr opacity-dim">Supports arithmetic, algebra, trigonometry, units, matrices, and more.</p>
        </div>
      </div>`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid expression.";
    const safeMessage = message.split("\n")[0]?.slice(0, 120) ?? "Invalid expression.";

    return createErrorOutput(
      `Could not evaluate: <span class="text-tertiary-clr">${expression}</span>`,
      `${safeMessage}<br>Type <span class="text-tertiary-clr font-bold">calc --help</span> to see supported syntax.`,
    );
  }
};
