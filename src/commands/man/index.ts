/**
 * man <command> — display the manual page for a command.
 *
 * Refactored structure:
 * - Pages split by category in /pages folder
 * - Renderer extracted to separate function
 * - Main handler remains clean and focused
 */

import { ManPageType } from "@/types";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output/output";
import {
  FUN_PAGES,
  INFO_PAGES,
  NETWORK_PAGES,
  SYSTEM_PAGES,
  UTILITY_PAGES,
} from "./pages";

// ─────────────────────────────────────────────────────────────────
// AGGREGATE ALL PAGES
// ─────────────────────────────────────────────────────────────────

const MAN_PAGES: Record<string, ManPageType> = {
  ...SYSTEM_PAGES,
  ...INFO_PAGES,
  ...NETWORK_PAGES,
  ...UTILITY_PAGES,
  ...FUN_PAGES,
};

const ALL_PAGES = Object.keys(MAN_PAGES).sort();

// ─────────────────────────────────────────────────────────────────
// RENDERER
// ─────────────────────────────────────────────────────────────────

function renderManPage(page: ManPageType): string {
  const sections: string[] = [];

  // NAME
  sections.push(`<div class="space-y-t-group">
    <p class="text-secondary-clr font-bold">NAME</p>
    <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
    <p><span class="text-tertiary-clr font-bold">${page.name}</span></p>
  </div>`);

  // SYNOPSIS
  sections.push(`<div class="space-y-t-group">
    <p class="text-secondary-clr font-bold">SYNOPSIS</p>
    <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
    ${page.synopsis
      .split("\n")
      .map((s) => `<p class="text-tertiary-clr">${s}</p>`)
      .join("")}
  </div>`);

  // DESCRIPTION
  sections.push(`<div class="space-y-t-group">
    <p class="text-secondary-clr font-bold">DESCRIPTION</p>
    <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
    <p>${page.description}</p>
  </div>`);

  // OPTIONS
  if (page.options) {
    sections.push(`<div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">OPTIONS</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      ${page.options}
    </div>`);
  }

  // EXAMPLES
  if (page.examples) {
    sections.push(`<div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">EXAMPLES</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      ${page.examples}
    </div>`);
  }

  // NOTES
  if (page.notes) {
    sections.push(`<div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">NOTES</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      <p>${page.notes}</p>
    </div>`);
  }

  // SEE ALSO
  if (page.seeAlso && page.seeAlso.length > 0) {
    const links = page.seeAlso
      .map(
        (cmd) => `<span class="text-tertiary-clr font-bold">${cmd}(1)</span>`,
      )
      .join("  ");
    sections.push(`<div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      <p>See also: ${links}</p>
    </div>`);
  }

  return `<div class="space-y-t-section py-t-outer">${sections.join("\n")}</div>`;
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleManCommand = (args: string[]) => {
  if (args.length === 0 || args[0] === "--help" || args[0] === "help") {
    const available = ALL_PAGES.map(
      (c) => `<span class="text-tertiary-clr">${c}</span>`,
    ).join(" · ");

    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">man — Manual Pages</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Detailed documentation for every registered command.</p>
          <p>
            <span class="text-secondary-clr">Usage:</span> 
            <span class="text-tertiary-clr font-bold">man &lt;command&gt;</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Available pages <span class="text-text-clr opacity-sep">(${ALL_PAGES.length} total)</span></p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>${available}</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>For quick usage, every command also accepts <span class="text-tertiary-clr font-bold">--help</span>.</p>
        </div>
      </div>`,
    );
  }

  const cmd = args[0].toLowerCase();
  const page = MAN_PAGES[cmd];

  if (!page) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p>No manual entry for <span class="text-tertiary-clr">${cmd}</span>.</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Try: <span class="text-tertiary-clr font-bold">${cmd} --help</span></p>
          <p>Or:  <span class="text-tertiary-clr font-bold">man</span> to list all manual pages</p>
        </div>
      </div>`,
    );
  }

  return createHtmlOutput(renderManPage(page));
};
