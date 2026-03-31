import * as React from "react";
import LiveClock from "@/components/LiveClock";

export * from "@/commands";

// ============================================
//  ASCII ART
// ============================================

export const ASCII_404 = `
░░██╗██╗░█████╗░░░██╗██╗
░██╔╝██║██╔══██╗░██╔╝██║
██╔╝░██║██║░░██║██╔╝░██║
███████║██║░░██║███████║
╚════██║╚█████╔╝╚════██║
░░░░░╚═╝░╚════╝░░░░░░╚═╝
`.trim();

export const ASCII_ERROR = `
███████╗██████╗░██████╗░░█████╗░██████╗░
██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
█████╗░░██████╔╝██████╔╝██║░░██║██████╔╝
██╔══╝░░██╔══██╗██╔══██╗██║░░██║██╔══██╗
███████╗██║░░██║██║░░██║╚█████╔╝██║░░██║
╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
`.trim();

// ============================================
// COMMANDS LIST
// ============================================

export const commands = [
  "about",
  "clear",
  "cowsay",
  "contact",
  "date",
  "exit",
  "email",
  "game",
  "help",
  "hostname",
  "joke",
  "neofetch",
  "projects",
  "quote",
  "repo",
  "resume",
  "rps",
  "sudo",
  "theme",
  "time",
  "typeface",
  "welcome",
  "weather",
  "whoami",
];

// ============================================
// HELP
// ============================================

export const getHelpCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "text" as const,
    content: [
      " ",
      "Available Commands:",
      "---------------------",
      " ",
      "Navigation & System:",
      " ",
      "  clear     - Clear the terminal screen.",
      "  exit      - Exit the terminal (close tab).",
      "  help      - List all available commands with descriptions.",
      "  hostname  - Display system information.",
      "  neofetch  - Display a Linux-style system summary.",
      "  theme     - Switch color theme. (Usage: theme <name>)",
      "  typeface  - Switch terminal font. (Usage: typeface <name>)",
      " ",
      "Information:",
      " ",
      "  about     - My story, my journey and my tech stack.",
      "  contact   - My social networks and contact details.",
      "  date      - Display a live clock with date, time and timezone.",
      "  time      - Alias for date — same live clock.",
      "  whoami    - Who is behind this terminal?",
      "  projects  - Browse my most notable projects.",
      "  repo      - View this portfolio's source code.",
      "  resume    - View or download my resume in French or English (PDF).",
      "  weather   - Get real-time weather for a city. (Example: weather Conakry)",
      "  email     - Display my email address.",
      " ",
      "Fun:",
      " ",
      "  cowsay    - Make a cow say your message in ASCII! (Try: cowsay Hello!)",
      "  game      - Interactive Frontend Quiz — test your knowledge! (Try: game)",
      "  joke      - Get a random programming joke.",
      "  quote     - Get an inspiring or funny quote.",
      "  rps       - Rock-paper-scissors against the terminal! (Usage: rps [rock|paper|scissors])",
      "  sudo      - Attempt to gain root access... (Good luck 😄)",
      "  welcome   - Display the welcome message again.",
      " ",
      "Keyboard Shortcuts:",
      " ",
      "  [Tab]         → Autocomplete commands.",
      "  [↑] [↓]       → Navigate the command history.",
      "  [Enter]       → Execute command.",
      "  [CTRL + L]    → Clear the terminal screen.",
      " ",
      "Type any command to get started!",
    ],
  },
];

// ============================================
// DATE & TIME
// ============================================

export const getDateCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "component" as const,
    component: React.createElement(LiveClock),
  },
];

export const getTimeCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "component" as const,
    component: React.createElement(LiveClock),
  },
];
