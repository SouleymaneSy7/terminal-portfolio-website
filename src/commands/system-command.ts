/**
 * System Commands
 *
 * Handles: welcome, neofetch, hostname, whoami, sudo
 *
 * @example
 * ```bash
 * welcome
 * neofetch
 * hostname --help
 * whoami
 * sudo
 * ```
 */

import { ASCII_NAME, ASCII_NEOFETCH } from "@/constants";
import packageJson from "../../package.json";

import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";

import { getCurrentFont, getCurrentTheme, getFontLabel, getThemeLabel } from "./theme-command";
import { audioService } from "@/services/audio.service";
import { createHtmlOutput } from "@/utils/output";
import {
  WELCOME_HELP,
  NEOFETCH_HELP,
  HOSTNAME_HELP,
  WHOAMI_HELP,
  SUDO_HELP,
} from "@/constants/help/system";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const packages = Object.keys(packageJson.dependencies);
const packagesDev = Object.keys(packageJson.devDependencies);

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

const getResolution = (): string => {
  if (typeof window === "undefined") return "N/A";
  return `${window.screen.availWidth}x${window.screen.availHeight}`;
};

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function buildWelcomeOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <pre class="text-primary-clr leading-snug select-none" aria-hidden="true">${ASCII_NAME}</pre>

      <div class="space-y-t-group">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.long}</p>
        <p class="font-bold">  Welcome to my terminal portfolio</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.long}</p>
      </div>

      <div class="space-y-t-group">
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">about</span>${DT.decorators.quote}
          to learn more about me.
        </p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">help</span>${DT.decorators.quote}
          to see all available commands.
        </p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.long}</p>

        <p>
          <span aria-hidden="true" class="text-secondary-clr">#</span>
          This terminal runs best on a real keyboard.
        </p>

        <p>
          <span aria-hidden="true" class="text-secondary-clr">#</span>
          Mobile works, but desktop is home.
          <span class="text-primary-clr shrink-0 text-fs-subtitle">⌨</span>
        </p>

        <p>
          <span aria-hidden="true" class="text-secondary-clr">#</span>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">audio on</span>${DT.decorators.quote}
          for keyboard sounds.
        </p>
      </div>

    </div>`,
  );
}

function buildNeofetchOutput(): CommandHistoryOutputType {
  const themeLabel = getThemeLabel(getCurrentTheme());
  const fontLabel = getFontLabel(getCurrentFont());
  const { enabled, volume } = audioService.getState();

  return createHtmlOutput(
    `<div class="py-t-outer">
  <div class="flex gap-4 md:gap-20 items-start flex-nowrap">

    <pre class="text-primary-clr shrink-0 m-0 leading-snug select-none" aria-hidden="true">${ASCII_NEOFETCH}</pre>

    <div class="space-y-t-section">

      <div class="space-y-t-group">
        <p>
          <span class="text-primary-clr font-bold">guest</span><span aria-hidden="true" class="text-secondary-clr">@</span><span class="text-tertiary-clr font-bold">souleymane-sy-portfolio</span>
        </p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      </div>

      <div class="space-y-t-group">
        <p><span class="text-secondary-clr font-bold">OS:          </span>  Portfolio OS v2025.1</p>
        <p><span class="text-secondary-clr font-bold">Host:        </span>  Vercel Platform</p>
        <p><span class="text-secondary-clr font-bold">Kernel:      </span>  Next.js 16 · React 19</p>
        <p><span class="text-secondary-clr font-bold">Shell:       </span>  TypeScript 5.x</p>
        <p><span class="text-secondary-clr font-bold">DE:          </span>  Terminal Portfolio v1.0</p>
        <p><span class="text-secondary-clr font-bold">Theme:       </span>  ${themeLabel}</p>
        <p><span class="text-secondary-clr font-bold">Font:        </span>  ${fontLabel}</p>
        <p><span class="text-secondary-clr font-bold">Audio:       </span>  ${enabled ? `<span class="text-tertiary-clr">ON</span><span class="text-text-clr opacity-sep"> · ${volume}%</span>` : `<span class="text-secondary-clr">OFF</span> <span class="text-text-clr opacity-sep">← type 'audio on' to enable</span>`}</p>
        <p><span class="text-secondary-clr font-bold">Resolution:  </span>  ${getResolution()}</p>
        <p><span class="text-secondary-clr font-bold">Uptime:      </span>  Online since 2025, no interruptions</p>
        <p><span class="text-secondary-clr font-bold">Packages:    </span>  ${packages.length} (prod) · ${packagesDev.length} (dev)</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">Stack</p>
        <p>${DT.decorators.bullet}  Next.js · React</p>
        <p>${DT.decorators.bullet}  TypeScript · Tailwind CSS v4</p>
        <p>${DT.decorators.bullet}  GSAP · Framer Motion</p>
        <p>${DT.decorators.bullet}  Axios · Date-fns · DOMPurify</p>
        <p>${DT.decorators.bullet}  Git · GitHub · Bun · Vercel</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">Journey</p>
        <p>${DT.decorators.bullet}  Self-taught since 2022</p>
        <p>${DT.decorators.bullet}  89+ GitHub repos</p>
        <p>${DT.decorators.bullet}  50+ Frontend Mentor challenges</p>
        <p>${DT.decorators.bullet}  🏆 Enzo Ustariz 2024 — Top 3</p>
        <p>${DT.decorators.bullet}  DevelopersHub Corporation — Certified</p>
        <p>${DT.decorators.bullet}  Coyah, Guinea-Conakry 🇬🇳</p>
      </div>

      <div class="space-y-0.5" aria-hidden="true">
        <div class="flex gap-0.5 items-baseline leading-none">
          <span class="text-primary-clr">████</span>
          <span class="text-secondary-clr">████</span>
          <span class="text-tertiary-clr">████</span>
          <span class="text-text-clr">████</span>
        </div>
        <div class="flex gap-0.5 items-baseline leading-none">
          <span class="text-primary-clr opacity-sep">████</span>
          <span class="text-secondary-clr opacity-sep">████</span>
          <span class="text-tertiary-clr opacity-sep">████</span>
          <span class="text-text-clr opacity-sep">████</span>
        </div>
      </div>

    </div>
  </div>
</div>`,
  );
}

function buildHostnameOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Hostname</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Hostname  </span>${DT.decorators.arrow}souleymane-sy-portfolio</p>
        <p><span class="text-secondary-clr">Owner     </span>${DT.decorators.arrow}Souleymane Sy</p>
        <p><span class="text-secondary-clr">Location  </span>${DT.decorators.arrow}Coyah, Guinea-Conakry 🇬🇳</p>
        <p><span class="text-secondary-clr">Uptime    </span>${DT.decorators.arrow}Online since 2025, no interruptions</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">neofetch</span>${DT.decorators.quote} for a full system overview.</p>
      </div>
    </div>`,
  );
}

function buildWhoamiOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

      <div class="space-y-t-group">
        <p>&gt; Identifying user...</p>
        <p>root@system</p>
        <p>...Just kidding! 😄</p>
        <p>You're exploring the terminal portfolio of <span class="text-secondary-clr font-bold">Souleymane Sy</span> —</p>
        <p>self-taught frontend web developer since 2022.</p>
        <p>Based in Coyah, Guinea-Conakry. React / Next.js / TypeScript specialist.</p>
        <p>89+ repos on GitHub. 50+ Frontend Mentor challenges.</p>
        <p><span class="text-tertiary-clr font-bold">🏆 3rd place</span> — Enzo Ustariz Web Contest 2024.</p>
        <p><span class="text-tertiary-clr font-bold">⭐ Certified with exceptional distinction</span> — DevelopersHub Corporation.</p>
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">about</span>${DT.decorators.quote}
          for my full story.
        </p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">projects</span>${DT.decorators.quote}
          to see what I've built.
        </p>
      </div>

    </div>`,
  );
}

function buildSudoOutput(): CommandHistoryOutputType {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>[sudo] Password for guest:</p>
        <p class="text-secondary-clr">Access Denied.</p>
        <p>Did you really think that would work? 😄</p>
        <p>The superpowers here are CSS and TypeScript.</p>
        <p>You don't need root access to build great things.</p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

export const handleWelcomeCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  return flags.help ? WELCOME_HELP : buildWelcomeOutput();
};

export const handleNeofetchCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  return flags.help ? NEOFETCH_HELP : buildNeofetchOutput();
};

export const handleHostnameCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  return flags.help ? HOSTNAME_HELP : buildHostnameOutput();
};

export const handleWhoamiCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  return flags.help ? WHOAMI_HELP : buildWhoamiOutput();
};

export const handleSudoCommand = (args: string[]): CommandHistoryOutputType => {
  const { flags } = parseArgs(args);
  return flags.help ? SUDO_HELP : buildSudoOutput();
};
