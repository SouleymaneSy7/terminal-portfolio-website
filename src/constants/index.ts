import * as React from "react";
import LiveClock from "@/components/LiveClock";
import { THEMES, FONTS } from "@/commands/theme-command";

// ─────────────────────────────────────────────────────────────────
// ASCII ART
// ─────────────────────────────────────────────────────────────────

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

export const createHtmlOutput = (content: string) => ({
  id: crypto.randomUUID(),
  type: "html" as const,
  content: [content],
});

// ─────────────────────────────────────────────────────────────────
// COMMANDS LIST  (alphabetical — drives tab completion)
// ─────────────────────────────────────────────────────────────────
export const commands = [
  "about",
  "age",
  "clear",
  "contact",
  "convert",
  "cowsay",
  "curl",
  "date",
  "email",
  "exit",
  "game",
  "help",
  "hostname",
  "joke",
  "neofetch",
  "note",
  "projects",
  "quote",
  "repo",
  "resume",
  "rps",
  "snippet",
  "sudo",
  "theme",
  "time",
  "todo",
  "typeface",
  "uuid",
  "weather",
  "welcome",
  "whoami",
];

// ─────────────────────────────────────────────────────────────────
// COMPLETIONS MAP  (tab completion — arguments per command)
// Derives directly from source-of-truth objects → no manual sync.
// ─────────────────────────────────────────────────────────────────

export const COMPLETIONS: Record<string, string[]> = {
  // Theming — derived from THEMES / FONTS objects automatically
  theme: Object.keys(THEMES),
  typeface: Object.keys(FONTS),

  // Fun & Games
  rps: ["rock", "paper", "scissors"],
  game: ["stats", "reset", "help", "--help"],

  // Network
  curl: ["--help", "-v", "-I", "-s", "-X", "-H", "-d", "-u", "-L", "-o"],

  // Utilities — subcommand-based
  note: ["add", "rm", "edit", "clear", "list", "help", "--help"],
  todo: ["add", "done", "undone", "rm", "clear", "list", "help", "--help"],
  snippet: ["add", "show", "rm", "clear", "list", "help", "--help"],
  uuid: ["v1", "v4", "validate", "help", "--help"],
  convert: ["list", "help", "--help"],

  // Simple commands — no arguments, but --help is always valid
  about: ["--help"],
  age: ["--help"],
  contact: ["--help"],
  cowsay: ["--help"],
  date: ["--help"],
  email: ["--help"],
  exit: ["--help"],
  hostname: ["--help"],
  joke: ["--help"],
  neofetch: ["--help"],
  projects: ["--help"],
  quote: ["--help"],
  repo: ["--help"],
  resume: ["--help"],
  sudo: ["--help"],
  time: ["--help"],
  weather: ["--help"],
  welcome: ["--help"],
  whoami: ["--help"],
};

// ─────────────────────────────────────────────────────────────────
// COMMANDS HELP
// ─────────────────────────────────────────────────────────────────

const helpBlock = (content: string) => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [content],
  },
];

export const ABOUT_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">about — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display my story, background, journey and tech stack.</p>
      <p><span class="text-secondary-clr">Usage:</span>  about</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">whoami</span> · <span class="text-tertiary-clr font-bold">projects</span> · <span class="text-tertiary-clr font-bold">contact</span></p>
    </div>
  </div>`,
);

export const CONTACT_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">contact — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display all my social links and contact details.</p>
      <p><span class="text-secondary-clr">Usage:</span>  contact</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">email</span> · <span class="text-tertiary-clr font-bold">resume</span></p>
    </div>
  </div>`,
);

export const COWSAY_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">cowsay — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Make an ASCII cow say your message.</p>
      <p><span class="text-secondary-clr">Usage:</span>  cowsay &lt;message&gt;</p>
    </div>
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Example</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  cowsay Hello, World!</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  cowsay I love TypeScript</p>
    </div>
  </div>`,
);

export const DATE_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">date — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display a live clock with current date, time and timezone.</p>
      <p><span class="text-secondary-clr">Usage:</span>  date</p>
      <p><span class="text-secondary-clr">Alias:</span>   time</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>The clock updates in real time — no refresh needed.</p>
    </div>
  </div>`,
);

export const EMAIL_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">email — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display my email address with a direct mailto link.</p>
      <p><span class="text-secondary-clr">Usage:</span>  email</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">contact</span> · <span class="text-tertiary-clr font-bold">resume</span></p>
    </div>
  </div>`,
);

export const EXIT_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">exit — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display a goodbye message. Close the browser tab to actually exit.</p>
      <p><span class="text-secondary-clr">Usage:</span>  exit</p>
    </div>
  </div>`,
);

export const HOSTNAME_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">hostname — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display the portfolio hostname, owner and uptime information.</p>
      <p><span class="text-secondary-clr">Usage:</span>  hostname</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">neofetch</span> · <span class="text-tertiary-clr font-bold">whoami</span></p>
    </div>
  </div>`,
);

export const JOKE_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">joke — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Fetch a random programming joke from the JokeAPI.</p>
      <p><span class="text-secondary-clr">Usage:</span>  joke</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Requires an internet connection. See also: <span class="text-tertiary-clr font-bold">quote</span></p>
    </div>
  </div>`,
);

export const NEOFETCH_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">neofetch — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display a Linux-style system summary with portfolio stats and tech stack.</p>
      <p><span class="text-secondary-clr">Usage:</span>  neofetch</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">hostname</span> · <span class="text-tertiary-clr font-bold">whoami</span></p>
    </div>
  </div>`,
);

export const PROJECTS_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">projects — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Browse my most notable projects with descriptions and live links.</p>
      <p><span class="text-secondary-clr">Usage:</span>  projects</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">repo</span> · <span class="text-tertiary-clr font-bold">about</span></p>
    </div>
  </div>`,
);

export const QUOTE_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">quote — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Fetch a random piece of advice from the Advice Slip API.</p>
      <p><span class="text-secondary-clr">Usage:</span>  quote</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Requires an internet connection. See also: <span class="text-tertiary-clr font-bold">joke</span></p>
    </div>
  </div>`,
);

export const REPO_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">repo — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display the GitHub source code link for this terminal portfolio.</p>
      <p><span class="text-secondary-clr">Usage:</span>  repo</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">projects</span></p>
    </div>
  </div>`,
);

export const RESUME_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">resume — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>View or download my CV. Available in English and French.</p>
      <p><span class="text-secondary-clr">Usage:</span>  resume</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">contact</span> · <span class="text-tertiary-clr font-bold">email</span></p>
    </div>
  </div>`,
);

export const RPS_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">rps — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Play Rock-Paper-Scissors against the terminal.</p>
      <p><span class="text-secondary-clr">Usage:</span>  rps &lt;rock|paper|scissors&gt;</p>
    </div>
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Examples</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  rps rock</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  rps paper</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  rps scissors</p>
    </div>
  </div>`,
);

export const SUDO_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">sudo — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Attempt to gain root access. Spoiler: it won't work. 😄</p>
      <p><span class="text-secondary-clr">Usage:</span>  sudo</p>
    </div>
  </div>`,
);

export const THEME_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">theme — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Switch the terminal color theme. Preference saved to localStorage.</p>
      <p><span class="text-secondary-clr">Usage:</span>  theme &lt;name&gt;</p>
      <p><span class="text-secondary-clr">List: </span>  theme</p>
    </div>
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Examples</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  theme dracula</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  theme tokyo-night</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  theme catppuccin-mocha</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Tab completion is available — try <span class="text-tertiary-clr font-bold">theme [Tab]</span> to browse.</p>
    </div>
  </div>`,
);

export const TYPEFACE_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">typeface — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Switch the terminal monospace font. Preference saved to localStorage.</p>
      <p><span class="text-secondary-clr">Usage:</span>  typeface &lt;name&gt;</p>
      <p><span class="text-secondary-clr">List: </span>  typeface</p>
    </div>
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Available fonts</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  cascadia</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  fira</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  geist</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  recursive-casual</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Tab completion is available — try <span class="text-tertiary-clr font-bold">typeface [Tab]</span> to browse.</p>
    </div>
  </div>`,
);

export const WEATHER_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">weather — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Fetch real-time weather for any city via wttr.in.</p>
      <p><span class="text-secondary-clr">Usage:</span>  weather &lt;city&gt;</p>
    </div>
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">Examples</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  weather Conakry</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  weather Paris</p>
      <p><span aria-hidden="true" class="text-tertiary-clr"> •</span>  weather New York</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Requires an internet connection.</p>
    </div>
  </div>`,
);

export const WELCOME_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">welcome — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Re-display the terminal welcome screen with ASCII art.</p>
      <p><span class="text-secondary-clr">Usage:</span>  welcome</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">help</span> · <span class="text-tertiary-clr font-bold">about</span></p>
    </div>
  </div>`,
);

export const WHOAMI_HELP = helpBlock(
  `<div class="space-y-t-section py-t-outer">
    <div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">whoami — Usage</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>Display a short summary of who is behind this terminal.</p>
      <p><span class="text-secondary-clr">Usage:</span>  whoami</p>
    </div>
    <div class="space-y-t-footer">
      <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      <p>See also: <span class="text-tertiary-clr font-bold">about</span> · <span class="text-tertiary-clr font-bold">neofetch</span></p>
    </div>
  </div>`,
);

// ─────────────────────────────────────────────────────────────────
// HELP
// ─────────────────────────────────────────────────────────────────
export const getHelpCommandOutput = () => [
  {
    id: crypto.randomUUID(),
    type: "html" as const,
    content: [
      `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="font-bold">Available commands <span class="text-text-clr opacity-sep">(${commands.length} total)</span></p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p class="text-text-clr opacity-70">
            <span class="font-bold text-secondary-clr">Tip:</span> every command accepts
            <span class="text-tertiary-clr font-bold"> --help</span>
            for detailed usage — e.g.
            <span class="text-tertiary-clr font-bold"> weather --help</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Navigation &amp; System</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">clear     </span> - Clear the terminal screen.</p>
          <p><span class="text-tertiary-clr font-bold">exit      </span> - Exit the terminal (close tab).</p>
          <p><span class="text-tertiary-clr font-bold">help      </span> - List all available commands.</p>
          <p><span class="text-tertiary-clr font-bold">hostname  </span> - Display system information.</p>
          <p><span class="text-tertiary-clr font-bold">neofetch  </span> - Linux-style system summary.</p>
          <p><span class="text-tertiary-clr font-bold">theme     </span> - Switch color theme.  <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">theme &lt;name&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">typeface  </span> - Switch terminal font. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">typeface &lt;name&gt;</span></p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Network</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">curl      </span> - Transfer data from a URL. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">curl [options] &lt;url&gt;</span></p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Information</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">about     </span> - My story, journey and tech stack.</p>
          <p><span class="text-tertiary-clr font-bold">contact   </span> - Social networks and contact details.</p>
          <p><span class="text-tertiary-clr font-bold">date      </span> - Live clock with date, time and timezone.</p>
          <p><span class="text-tertiary-clr font-bold">time      </span> - Alias for date — same live clock.</p>
          <p><span class="text-tertiary-clr font-bold">email     </span> - Display my email address.</p>
          <p><span class="text-tertiary-clr font-bold">projects  </span> - Browse my most notable projects.</p>
          <p><span class="text-tertiary-clr font-bold">repo      </span> - This portfolio's source code.</p>
          <p><span class="text-tertiary-clr font-bold">resume    </span> - View / download my CV (FR &amp; EN).</p>
          <p><span class="text-tertiary-clr font-bold">weather   </span> - Real-time weather. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">weather &lt;city&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">whoami    </span> - Who is behind this terminal?</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Utilities</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">age       </span> - Calculate age from a birthdate.   <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">age &lt;date&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">convert   </span> - Real-time currency conversion.    <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">note      </span> - Persistent note manager.          <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">note &lt;add|rm|edit|clear&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">snippet   </span> - Store &amp; retrieve code snippets.  <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">snippet &lt;add|show|rm&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">todo      </span> - Task list with done/undone.        <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">todo &lt;add|done|rm&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">uuid      </span> - Generate &amp; validate UUIDs.       <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">uuid [v1|v4] [count]</span></p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Fun &amp; Games</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">cowsay    </span> - ASCII cow says your message. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">cowsay &lt;msg&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">game      </span> - Frontend quiz — test your knowledge.</p>
          <p><span class="text-tertiary-clr font-bold">joke      </span> - Random programming joke.</p>
          <p><span class="text-tertiary-clr font-bold">quote     </span> - Inspiring advice quote.</p>
          <p><span class="text-tertiary-clr font-bold">rps       </span> - Rock-paper-scissors. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">rps [rock|paper|scissors]</span></p>
          <p><span class="text-tertiary-clr font-bold">sudo      </span> - Attempt to gain root access... 😄</p>
          <p><span class="text-tertiary-clr font-bold">welcome   </span> - Display the welcome message again.</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Keyboard Shortcuts</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">[Tab]      </span> - Autocomplete commands and arguments.</p>
          <p><span class="text-tertiary-clr font-bold">[↑] [↓]    </span> - Navigate command history.</p>
          <p><span class="text-tertiary-clr font-bold">[Enter]    </span> - Execute command.</p>
          <p><span class="text-tertiary-clr font-bold">[CTRL + L] </span> - Clear the terminal screen.</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type any command to get started — or try <span class="text-tertiary-clr font-bold">neofetch</span> for the full system overview.</p>
        </div>

      </div>`,
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// DATE & TIME
// ─────────────────────────────────────────────────────────────────
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
