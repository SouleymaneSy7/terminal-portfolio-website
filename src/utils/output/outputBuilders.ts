/**
 * Output Builders - Standardized output creation utilities
 *
 * Provides consistent output builders for common patterns:
 * - Error messages with hints
 * - Success messages
 * - Usage/help blocks
 */

import type {
  CommandHistoryOutputType,
  HelpConfigType,
  UsageConfigType,
} from "@/types";
import { DESIGN_TOKENS as DT } from "../designTokens";

/**
 * Create standardized error output
 *
 * @param message - Error message to display
 * @param hint - Optional hint or suggestion
 * @returns Command output block
 */
export function createErrorOutput(
  message: string,
  hint?: string,
): CommandHistoryOutputType {
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
  ];
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
  ];
}

/**
 * Create standardized usage output
 *
 * @param config - Usage configuration
 * @returns Command output block
 */

export function createUsageOutput(
  config: UsageConfigType,
): CommandHistoryOutputType {
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
  ];
}

/**
 * Configuration for help block creation
 */

/**
 * Create standardized help block
 *
 * @param config - Help configuration
 * @returns Command output block
 */
export function createHelpOutput(
  config: HelpConfigType,
): CommandHistoryOutputType {
  let content = `<div class="space-y-t-section py-t-outer">`;

  // Name and description
  content += `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">${config.name}</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      <p>${config.description}</p>
    </div>`;

  // Usage
  content += `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      <p>${config.usage}</p>
    </div>`;

  // Options
  if (config.options && config.options.length > 0) {
    content += `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Options</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>`;
    config.options.forEach((opt) => {
      content += `
      <p>${DT.decorators.bullet} <span class="text-tertiary-clr font-bold">${opt.flag}</span> ${DT.separators.short.slice(0, 5)} ${opt.description}</p>`;
    });
    content += `</div>`;
  }

  // Examples
  if (config.examples && config.examples.length > 0) {
    content += `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Examples</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>`;
    config.examples.forEach((ex) => {
      content += `
      <p>${DT.decorators.bullet} <span class="text-tertiary-clr">${ex.command}</span></p>
      <p class="text-text-clr opacity-70 ml-4">${ex.description}</p>`;
    });
    content += `</div>`;
  }

  // Notes
  if (config.notes) {
    content += `
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Notes</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      <p>${config.notes}</p>
    </div>`;
  }

  // See Also
  if (config.seeAlso && config.seeAlso.length > 0) {
    content += `
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      <p>See also: ${config.seeAlso.map((cmd) => `<span class="text-tertiary-clr font-bold">${cmd}</span>`).join(", ")}</p>
    </div>`;
  }

  content += `</div>`;

  return [
    {
      id: crypto.randomUUID(),
      type: "html",
      content: [content],
    },
  ];
}
