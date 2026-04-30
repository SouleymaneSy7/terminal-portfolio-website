/**
 * Fun Commands - Exit and Rock-Paper-Scissors game
 *
 * @description
 * Collection of fun commands including exit message and RPS game.
 *
 * @example
 * ```bash
 * exit
 * rps rock
 * rps --help
 * ```
 */

import { EXIT_HELP, RPS_HELP } from "@/constants/help/fun";
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";

// ─────────────────────────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────────────────────────

const RPS_CHOICES = ["rock", "paper", "scissors"] as const;
type RpsChoice = (typeof RPS_CHOICES)[number];

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

function determineWinner(
  userChoice: RpsChoice,
  computerChoice: RpsChoice,
): {
  result: string;
  color: string;
} {
  if (userChoice === computerChoice) {
    return {
      result: "It's a tie! We think alike. 🤝",
      color: "text-primary-clr",
    };
  }

  const winConditions: Record<RpsChoice, RpsChoice> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (winConditions[userChoice] === computerChoice) {
    return {
      result: "You win! Well played, champion! 🏆",
      color: "text-tertiary-clr",
    };
  }

  return {
    result: "I win! The terminal is merciless. 😄",
    color: "text-secondary-clr",
  };
}

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createExitOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Goodbye 👋</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Thanks for visiting. This terminal is my story —</p>
        <p>built line by line, from Coyah, Guinea-Conakry,</p>
        <p>without a school, without a bootcamp, without shortcuts.</p>
        <p>Just code, persistence, and the refusal to quit.</p>
      </div>

      <div class="space-y-t-group">
        <p>If something here caught your eye — reach out.</p>
        <p>An opportunity, a collaboration, a project, or just a conversation —</p>
        <p>
          ${DT.decorators.arrow}
          <a href="mailto:souleymanesycodes@gmail.com" target="_blank" rel="noopener noreferrer">
            souleymanesycodes@gmail.com
          </a>
        </p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Close this tab to exit. See you around. 🌍</p>
      </div>

    </div>`,
  );
}

function createRpsResultOutput(
  userChoice: RpsChoice,
  computerChoice: RpsChoice,
): CommandHistoryOutputType {
  const { result, color } = determineWinner(userChoice, computerChoice);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p><span class="text-secondary-clr">You  ${DT.decorators.arrow}</span> ${userChoice}</p>
        <p><span class="text-secondary-clr">Me   ${DT.decorators.arrow}</span> ${computerChoice}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="${color} font-bold">${result}</p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Play again? Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">rps</span>${DT.decorators.quote}
          followed by your choice.
        </p>
      </div>

    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLERS (exported)
// ─────────────────────────────────────────────────────────────────

/**
 * Handle exit command execution
 *
 * @param args - Command arguments
 * @returns Command output blocks
 */
export const handleExitCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);

  if (flags.help) return EXIT_HELP;

  return createExitOutput();
};

/**
 * Handle rock-paper-scissors command execution
 *
 * @param args - Command arguments
 * @returns Command output blocks
 */
export const handleRpsCommand = (args: string[]): CommandHistoryOutputType => {
  const parsed = parseArgs(args);

  if (parsed.flags.help) {
    return RPS_HELP;
  }

  if (parsed.positional.length === 0) {
    return createErrorOutput(
      "Invalid choice.",
      `Pick <span class="text-tertiary-clr">rock</span>, <span class="text-tertiary-clr">paper</span> or <span class="text-tertiary-clr">scissors</span>. Example: ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">rps rock</span>${DT.decorators.quote}`,
    );
  }

  const userChoice = parsed.positional[0].toLowerCase().trim();

  if (!RPS_CHOICES.includes(userChoice as RpsChoice)) {
    return createErrorOutput(
      "Invalid choice.",
      `Pick <span class="text-tertiary-clr">rock</span>, <span class="text-tertiary-clr">paper</span> or <span class="text-tertiary-clr">scissors</span>. Example: ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">rps rock</span>${DT.decorators.quote}`,
    );
  }

  const computerChoice =
    RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)];

  return createRpsResultOutput(userChoice as RpsChoice, computerChoice);
};
