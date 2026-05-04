/**
 * UUID generator and validator.
 * Supports v1 (time-based) and v4 (random) generation, batch up to 20, and validation.
 *
 * @example
 * ```bash
 * uuid
 * uuid v1 5
 * uuid v4 10
 * uuid validate <string>
 * uuid --help
 * ```
 */

import { v1, v4, validate } from "uuid"
import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { UUID_HELP } from "@/constants/help/utils"
import { createHtmlOutput, createErrorOutput } from "@/utils/output"

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const MAX_COUNT = 20

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function buildGenerateOutput(version: 1 | 4, count: number) {
  const safeCount = Math.min(Math.max(1, count), MAX_COUNT)
  const gen = version === 1 ? v1 : v4
  const ids = Array.from({ length: safeCount }, () => gen())

  const rows = ids.map((id) => `<p class="text-tertiary-clr font-bold">${id}</p>`).join("\n")

  const countNote =
    safeCount > 1 ? `<p class="text-text-clr opacity-sep">${safeCount} UUIDs generated</p>` : ""

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">UUID v${version}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
        ${countNote}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">uuid validate &lt;string&gt;</span>${DT.decorators.quote} to validate a UUID.</p>
      </div>
    </div>`,
  )
}

function buildValidateOutput(input: string) {
  const isValid = validate(input)
  const statusClass = isValid ? "text-tertiary-clr" : "text-secondary-clr"
  const statusIcon = isValid ? DT.icons.success : DT.icons.error
  const statusText = isValid ? "Valid UUID" : "Invalid UUID"

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">UUID Validation</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Input  </span>  <span class="text-text-clr">${input}</span></p>
        <p><span class="text-secondary-clr">Result </span>  <span class="${statusClass} font-bold">${statusIcon}  ${statusText}</span></p>
      </div>
    </div>`,
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleUUIDCommand = (args: string[]) => {
  const parsed = parseArgs(args)

  if (parsed.flags.help) return UUID_HELP

  const sub = parsed.subcommand?.toLowerCase()

  // uuid validate <string>
  if (sub === "validate") {
    const input = parsed.positional.slice(1).join("").trim()
    if (!input) {
      return createErrorOutput(
        "Please provide a UUID string to validate.",
        `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">uuid validate &lt;uuid-string&gt;</span>`,
      )
    }
    return buildValidateOutput(input)
  }

  // uuid help
  // if (sub === "help") return UUID_HELP;

  // uuid v1 [n]
  if (sub === "v1") {
    const n = parseInt(parsed.positional[1] ?? "1", 10)
    return buildGenerateOutput(1, isNaN(n) ? 1 : n)
  }

  // uuid v4 [n]  or  uuid (no args)
  if (sub === "v4" || !sub) {
    const n = parseInt(parsed.positional[1] ?? "1", 10)
    return buildGenerateOutput(4, isNaN(n) ? 1 : n)
  }

  // uuid <n>  — shorthand for uuid v4 <n>
  const n = parseInt(sub, 10)
  if (!isNaN(n)) return buildGenerateOutput(4, n)

  return createErrorOutput(
    `Unknown argument: <span class="text-tertiary-clr">"${args[0]}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">uuid help</span>${DT.decorators.quote} for all options.`,
  )
}
