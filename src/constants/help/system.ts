/**
 * Help outputs for system commands
 */

import { createHelpOutput } from "@/utils/output";

export const WELCOME_HELP = createHelpOutput({
  name: "welcome",
  usage: "welcome",
  description: "Re-display the terminal welcome screen with ASCII art.",
  seeAlso: ["help", "about"],
});

export const NEOFETCH_HELP = createHelpOutput({
  name: "neofetch",
  usage: "neofetch",
  description:
    "Display a Linux-style system summary with portfolio stats and tech stack.",
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
  usage: "theme <name>",
  description:
    "Switch the terminal color theme. Preference saved to localStorage.",
  options: [
    { flag: "theme", description: "List all available themes" },
    { flag: "theme <name>", description: "Switch to specified theme" },
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
  ],
  notes:
    "Tab completion is available — try theme [Tab] to browse all 31 themes.",
});

export const TYPEFACE_HELP = createHelpOutput({
  name: "typeface",
  usage: "typeface <name>",
  description:
    "Switch the terminal monospace font. Preference saved to localStorage.",
  options: [
    { flag: "typeface", description: "List all available fonts" },
    { flag: "typeface <name>", description: "Switch to specified font" },
  ],
  examples: [
    {
      command: "typeface cascadia",
      description: "Switch to Cascadia Code (default)",
    },
    { command: "typeface fira", description: "Switch to Fira Code" },
    { command: "typeface geist", description: "Switch to Geist Mono" },
    {
      command: "typeface recursive-casual",
      description: "Switch to Recursive Casual Mono",
    },
  ],
  notes:
    "Tab completion is available — try typeface [Tab] to browse all 15 fonts.",
});
