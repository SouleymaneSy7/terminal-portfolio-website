/**
 * Cowsay Command - ASCII cow art
 *
 * @description
 * Make a cow say your message in ASCII art.
 *
 * @example
 * ```bash
 * cowsay Hello World
 * cowsay --help
 * ```
 */

import { COWSAY_HELP } from "@/constants/help/fun";
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output";

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createCowsayUsageOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>Make a cow say something — just provide a message as an argument.</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Usage  </span>${DT.decorators.arrow}<span class="text-tertiary-clr font-bold">cowsay &lt;message&gt;</span></p>
        <p><span class="text-secondary-clr">Example</span>${DT.decorators.arrow}<span class="text-tertiary-clr">cowsay Hello, World!</span></p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">cowsay --help</span>${DT.decorators.quote} for more options.</p>
      </div>
    </div>`,
  );
}

function createCowsayOutput(message: string): CommandHistoryOutputType {
  const borderLength = message.length + 2;
  const topBorder = " " + "_".repeat(borderLength);
  const bottomBorder = " " + "-".repeat(borderLength);

  return [
    {
      id: crypto.randomUUID(),
      type: "text" as const,
      content: [
        topBorder,
        `< ${message} >`,
        bottomBorder,
        "        \\   ^__^",
        "         \\  (oo)\\_______",
        "            (__)\\       )\\/\\",
        "                ||----w |",
        "                ||     ||",
      ],
    },
  ];
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

export const handleCowsayCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  if (flags.help) return COWSAY_HELP;

  const message = args.join(" ").trim();
  if (!message) return createCowsayUsageOutput();

  return createCowsayOutput(message);
};
