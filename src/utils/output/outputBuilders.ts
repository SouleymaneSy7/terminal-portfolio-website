/**
 * Output Builders - Standardized output creation utilities
 *
 * Provides consistent output builders for common patterns:
 * - Error messages with hints
 * - Success messages
 * - Usage/help blocks
 */

import type { CommandHistoryOutputType, HelpConfigType, UsageConfigType } from "@/types"
import { DESIGN_TOKENS as DT } from "../designTokens"

/**
 * Create standardized error output
 *
 * @param message - Error message to display
 * @param hint - Optional hint or suggestion
 * @returns Command output block
 */
export function createErrorOutput(message: string, hint?: string): CommandHistoryOutputType {
  return [
    {
      id: crypto.randomUUID(),
      type: "html",
      content: [
        `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${DT.icons.warning}  ${message}</p>
      </div>
      ${
        hint
          ? `
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${hint}</p>
      </div>`
          : ""
      }
    </div>`,
      ],
    },
  ]
}

/**
 * Create standardized success output
 *
 * @param message - Success message to display
 * @returns Command output block
 */
export function createSuccessOutput(message: string): CommandHistoryOutputType {
  return [
    {
      id: crypto.randomUUID(),
      type: "html",
      content: [
        `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${DT.icons.success}  ${message}</p>
      </div>
    </div>`,
      ],
    },
  ]
}

/**
 * Create standardized usage output
 *
 * @param config - Usage configuration
 * @returns Command output block
 */

export function createUsageOutput(config: UsageConfigType): CommandHistoryOutputType {
  return [
    {
      id: crypto.randomUUID(),
      type: "html",
      content: [
        `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Usage</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${config.usage}</p>
        ${config.description ? `<p class="text-text-clr opacity-70">${config.description}</p>` : ""}
      </div>
      ${
        config.hint
          ? `
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${config.hint}</p>
      </div>`
          : ""
      }
    </div>`,
      ],
    },
  ]
}

// ─────────────────────────────────────────────────────────────────
//  SECTION BUILDERS
// ─────────────────────────────────────────────────────────────────

function separatorLine(): string {
  return `<p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>`
}

function sectionGroup(heading: string, content: string): string {
  return `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">${heading}</p>
      ${separatorLine()}
      <p>${content}</p>
    </div>`
}

function sectionOptions(options: HelpConfigType["options"]): string {
  const items = options!
    .map(
      (opt) =>
        `<p>${DT.decorators.bullet} <span class="text-tertiary-clr font-bold">${opt.flag}</span> ${DT.separators.short.slice(0, 5)} ${opt.description}</p>`,
    )
    .join("\n")

  return `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Options</p>
      ${separatorLine()}
      ${items}
    </div>`
}

function sectionExamples(examples: HelpConfigType["examples"]): string {
  const items = examples!
    .map(
      (ex) =>
        `<p>${DT.decorators.bullet} <span class="text-tertiary-clr">${ex.command}</span></p>
      <p class="text-text-clr opacity-70 ml-4">${ex.description}</p>`,
    )
    .join("\n")

  return `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Examples</p>
      ${separatorLine()}
      ${items}
    </div>`
}

function sectionNotes(notes: string): string {
  return `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Notes</p>
      ${separatorLine()}
      <p>${notes}</p>
    </div>`
}

function sectionSeeAlso(commands: string[]): string {
  const links = commands
    .map((cmd) => `<span class="text-tertiary-clr font-bold">${cmd}</span>`)
    .join(", ")

  return `
    <div class="space-y-t-footer">
      ${separatorLine()}
      <p>See also: ${links}</p>
    </div>`
}

/**
 * Create standardized help block
 *
 * @param config - Help configuration
 * @returns Command output block
 */
export function createHelpOutput(config: HelpConfigType): CommandHistoryOutputType {
  const parts = [
    `<div class="space-y-t-section py-t-outer">`,
    sectionGroup(config.name, config.description),
    sectionGroup("Usage", config.usage),
    config.options?.length ? sectionOptions(config.options) : "",
    config.examples?.length ? sectionExamples(config.examples) : "",
    config.notes ? sectionNotes(config.notes) : "",
    config.seeAlso?.length ? sectionSeeAlso(config.seeAlso) : "",
    `</div>`,
  ]

  return [
    {
      id: crypto.randomUUID(),
      type: "html",
      content: [parts.filter(Boolean).join("\n")],
    },
  ]
}
