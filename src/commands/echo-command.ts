/**
 * Echo Command - Output text to the terminal
 *
 * @description
 * Outputs text to the terminal with support for \n newlines and basic escape sequences.
 *
 * @param args - Command arguments
 * @returns Command output blocks
 *
 * @example
 * ```bash
 * echo Hello, World!
 * echo I love TypeScript
 * echo Line 1\nLine 2
 * echo --help
 * ```
 */

import type { CommandHistoryOutputType } from "@/types"
import { parseArgs } from "@/utils/argParser"
import { createErrorOutput, createTextOutput } from "@/utils/output"
import { ECHO_HELP } from "@/constants/help/utils"

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

/**
 * Handle echo command execution
 *
 * @param args - Command arguments
 * @returns Command output blocks
 */
export const handleEchoCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args)

  if (flags.help) return ECHO_HELP

  if (args.length === 0) {
    return createErrorOutput(
      "No text provided.",
      `Type <span class="text-tertiary-clr font-bold">echo --help</span> for usage and examples.`,
    )
  }

  // Join args and replace literal \n with newlines
  const raw = args.join(" ").replace(/\\n/g, "\n")
  const lines = raw.split("\n")

  return createTextOutput(lines)
}
