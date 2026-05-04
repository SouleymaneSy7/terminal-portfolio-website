/**
 * Argument Parser - Unified command argument parsing
 *
 * Standardized parser for all command arguments with support for:
 * - Flags (--flag, -f)
 * - Options with values (--option value)
 * - Positional arguments
 * - Help detection
 */

import { ParsedArgsType } from "@/types"

/**
 * Parse command arguments into structured format
 *
 * @param args - Raw command arguments
 * @returns Parsed arguments object
 *
 * @example
 * ```typescript
 * parseArgs(["add", "--verbose", "-f", "file.txt"])
 * // { command: "", subcommand: "add", flags: { verbose: true, f: true }, options: {}, positional: ["file.txt"] }
 * ```
 */
export function parseArgs(args: string[]): ParsedArgsType {
  const result: ParsedArgsType = {
    command: "",
    flags: {},
    options: {},
    positional: [],
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    const isHelpWord = arg === "help" && i === 0
    if (arg === "--help" || arg === "-h" || isHelpWord) {
      result.flags.help = true
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2)
      const next = args[i + 1]
      if (next && !next.startsWith("-")) {
        result.options[key] = next
        i++
      } else {
        result.flags[key] = true
      }
    } else if (arg.startsWith("-") && arg.length > 1) {
      // Handle short flags like -v, -I, etc.
      const flags = arg.slice(1).split("")
      flags.forEach((flag) => {
        result.flags[flag] = true
      })
    } else {
      result.positional.push(arg)
    }
  }

  // First positional is typically the subcommand
  if (result.positional.length > 0) {
    result.subcommand = result.positional[0]
  }

  return result
}

/**
 * Check if help flag is present in arguments
 */
export function isHelp(args: string[]): boolean {
  return args.includes("--help") || args.includes("-h") || args.includes("help")
}
