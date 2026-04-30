/**
 * Joke Command - Random programming jokes
 *
 * @description
 * Fetch random programming jokes from JokeAPI.
 *
 * @example
 * ```bash
 * joke
 * joke --help
 * ```
 */

import { JOKE_HELP } from "@/constants/help/fun";
import { jokeService } from "@/services";
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createJokeOutput(setup: string, delivery: string): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${setup}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-secondary-clr font-bold">${delivery}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">joke</span>${DT.decorators.quote} for another one.</p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

export const handleJokeCommand = async (
  args: string[],
): Promise<CommandHistoryOutputType> => {
  const { flags } = parseArgs(args);
  if (flags.help) return JOKE_HELP;

  const joke = await jokeService.getRandomJoke();
  
  if (joke?.type === "twopart") {
    return createJokeOutput(joke.setup, joke.delivery);
  }

  return createErrorOutput(
    "Could not fetch a joke.",
    "Try again later."
  );
};
