/**
 * Quote Command - Random inspirational quotes
 *
 * @description
 * Fetch random inspirational quotes from Advice Slip API.
 *
 * @example
 * ```bash
 * quote
 * quote --help
 * ```
 */

import type { CommandHistoryOutputType } from "@/types"
import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { createErrorOutput, createHtmlOutput } from "@/utils/output"
import { QUOTE_HELP } from "@/constants/help/fun"
import { quoteService } from "@/services"

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createQuoteOutput(advice: string): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-secondary-clr">"${advice}"</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      </div>
      <div class="space-y-t-footer">
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">quote</span>${DT.decorators.quote} for another one.</p>
      </div>
    </div>`,
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

export const handleQuoteCommand = async (args: string[]): Promise<CommandHistoryOutputType> => {
  const { flags } = parseArgs(args)
  if (flags.help) return QUOTE_HELP

  const quote = await quoteService.getRandomQuote()

  if (quote) {
    return createQuoteOutput(quote.slip.advice)
  }

  return createErrorOutput("Could not fetch a quote.", "Try again later.")
}
