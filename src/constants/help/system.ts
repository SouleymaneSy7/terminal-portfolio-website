/**
 * Help outputs for system commands
 */

import { createHelpOutput } from "@/utils/output";

export const AUDIO_HELP = createHelpOutput({
  name: "audio",
  usage: "audio [on|off|volume <0-100>]",
  description:
    "Toggle keyboard sound effects and control their volume. Sounds are generated locally via the Web Audio API — no network requests.",
  options: [
    { flag: "audio", description: "Show current status and volume level" },
    { flag: "audio on", description: "Enable keyboard sound effects" },
    { flag: "audio off", description: "Disable keyboard sound effects" },
    { flag: "audio volume <n>", description: "Set volume from 0 to 100" },
    { flag: "--help, -h", description: "Show this help message" },
  ],
  examples: [
    { command: "audio on", description: "Enable sounds" },
    { command: "audio off", description: "Disable sounds" },
    { command: "audio volume 80", description: "Set volume to 80%" },
    { command: "audio volume 0", description: "Mute without disabling" },
    { command: "audio", description: "Check current status" },
  ],
  notes:
    'Preference is persisted in localStorage and restored on every page load. Audio is <span class="text-tertiary-clr">disabled by default</span> — it must be explicitly enabled. Respects <span class="text-tertiary-clr">prefers-reduced-motion</span>.',
  seeAlso: ["theme", "typeface"],
});

export const WELCOME_HELP = createHelpOutput({
  name: "welcome",
  usage: "welcome",
  description: "Re-display the terminal welcome screen with ASCII art.",
  seeAlso: ["help", "about"],
});

export const NEOFETCH_HELP = createHelpOutput({
  name: "neofetch",
  usage: "neofetch",
  description: "Display a Linux-style system summary with portfolio stats and tech stack.",
  seeAlso: ["hostname", "whoami"],
});

export const HOSTNAME_HELP = createHelpOutput({
  name: "hostname",
  usage: "hostname",
  description: "Display the portfolio hostname, owner and uptime information.",
  seeAlso: ["neofetch", "whoami"],
});

export const WHOAMI_HELP = createHelpOutput({
  name: "whoami",
  usage: "whoami",
  description: "Display a short summary of who is behind this terminal.",
  seeAlso: ["about", "neofetch"],
});

export const SUDO_HELP = createHelpOutput({
  name: "sudo",
  usage: "sudo",
  description: "Attempt to gain root access. Spoiler: it won't work. 😄",
});

export const THEME_HELP = createHelpOutput({
  name: "theme",
  usage: "theme <name> [--random]",
  description: "Switch the terminal color theme. Preference saved to localStorage.",
  options: [
    { flag: "theme", description: "List all available themes" },
    { flag: "theme <name>", description: "Switch to specified theme" },
    { flag: "theme --random, -r, random", description: "Switch to a random theme" },
  ],
  examples: [
    { command: "theme dracula", description: "Switch to Dracula theme" },
    {
      command: "theme tokyo-night",
      description: "Switch to Tokyo Night theme",
    },
    {
      command: "theme catppuccin-mocha",
      description: "Switch to Catppuccin Mocha theme",
    },
    { command: "theme --random", description: "Roll the dice on a random theme" },
    { command: "theme random", description: "Same result, different syntax" },
  ],
  notes: "Tab completion is available — try theme [Tab] to browse all 31 themes, or use --random / -r / random for a surprise.",
});

export const TYPEFACE_HELP = createHelpOutput({
  name: "typeface",
  usage: "typeface <name> [--random]",
  description: "Switch the terminal monospace font. Preference saved to localStorage.",
  options: [
    { flag: "typeface", description: "List all available fonts" },
    { flag: "typeface <name>", description: "Switch to specified font" },
    { flag: "typeface --random, -r, random", description: "Switch to a random font" },
  ],
  examples: [
    {
      command: "typeface recursive-casual",
      description: "Switch to Recursive Casual Mono (default)",
    },
    { command: "typeface fira", description: "Switch to Fira Code" },
    { command: "typeface geist", description: "Switch to Geist Mono" },
    { command: "typeface --random", description: "Roll the dice on a random font" },
    { command: "typeface random", description: "Same result, different syntax" },
  ],
  notes: "Tab completion is available — try typeface [Tab] to browse all 15 fonts, or use --random / -r / random for a surprise.",
});
