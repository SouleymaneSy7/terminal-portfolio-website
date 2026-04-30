/**
 * Resume Command - View or download CV in English or French
 *
 * @description
 * Displays links to view or download the resume/CV in both English and French versions.
 *
 * @param args - Command arguments
 * @returns Command output blocks
 *
 * @example
 * ```bash
 * resume
 * resume --help
 * ```
 */

import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output";
import { RESUME_HELP } from "@/constants/help/info";

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createResumeOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Resume</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Three years of self-teaching, 89+ public repos, 50+ Frontend Mentor</p>
        <p>challenges, a contest podium, and a certified internship — condensed</p>
        <p>into two pages. Available in English and French.</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-primary-clr font-bold">🇬🇧  English Version</p>
        <div class="pl-4 space-y-t-group">
          <div>
            <span class="text-secondary-clr">View      ${DT.decorators.arrow}</span>
            <a href="/resume/resume-en.pdf" target="_blank" rel="noopener noreferrer">
              Open PDF in browser
            </a>
          </div>
          <div>
            <span class="text-secondary-clr">Download  ${DT.decorators.arrow}</span>
            <a href="/resume/resume-en.pdf" download="Souleymane_Sy_Resume_EN.pdf">
              Download PDF
            </a>
          </div>
        </div>
      </div>

      <div class="space-y-t-group">
        <p class="text-primary-clr font-bold">🇫🇷  Version Française</p>
        <div class="pl-4 space-y-t-group">
          <div>
            <span class="text-secondary-clr">Voir        ${DT.decorators.arrow}</span>
            <a href="/resume/resume-fr.pdf" target="_blank" rel="noopener noreferrer">
              Ouvrir le PDF dans le navigateur
            </a>
          </div>
          <div>
            <span class="text-secondary-clr">Télécharger ${DT.decorators.arrow}</span>
            <a href="/resume/resume-fr.pdf" download="Souleymane_Sy_CV_FR.pdf">
              Télécharger le PDF
            </a>
          </div>
        </div>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Prefer to talk first? Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">contact</span>${DT.decorators.quote}
          — I always reply.
        </p>
      </div>

    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER (exported)
// ─────────────────────────────────────────────────────────────────

/**
 * Handle resume command execution
 *
 * @param args - Command arguments
 * @returns Command output blocks
 */
export const handleResumeCommand = (
  args: string[],
): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);

  if (flags.help) return RESUME_HELP;

  return createResumeOutput();
};
