import * as React from "react";
import LiveClock from "@/components/LiveClock";
import { THEMES, FONTS } from "@/commands/theme-command";

export * from "@/commands";

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

// ─────────────────────────────────────────────────────────────────
// COMMANDS LIST  (tab completion — command names)
// ─────────────────────────────────────────────────────────────────
export const commands = [
  "about",
  "clear",
  "contact",
  "cowsay",
  "date",
  "email",
  "exit",
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
  "weather",
  "welcome",
  "whoami",
];

// ─────────────────────────────────────────────────────────────────
// COMPLETIONS MAP  (tab completion — arguments per command)
//
// Keys are command names.
// Values are the valid arguments that command accepts.
// Empty array means the command takes free text (no completions).
// ─────────────────────────────────────────────────────────────────

export const COMPLETIONS: Record<string, string[]> = {
  theme: Object.keys(THEMES),
  typeface: Object.keys(FONTS),
  rps: ["rock", "paper", "scissors"],
  game: ["stats", "reset", "help"],
  cowsay: [],
  weather: [],
};

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
          <p class="font-bold">Available commands:</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Navigation & System</p>
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
          <p class="text-secondary-clr font-bold">Information</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">about     </span> - My story, journey and tech stack.</p>
          <p><span class="text-tertiary-clr font-bold">contact   </span> - Social networks and contact details.</p>
          <p><span class="text-tertiary-clr font-bold">date      </span> - Live clock with date, time and timezone.</p>
          <p><span class="text-tertiary-clr font-bold">time      </span> - Alias for date — same live clock.</p>
          <p><span class="text-tertiary-clr font-bold">email     </span> - Display my email address.</p>
          <p><span class="text-tertiary-clr font-bold">projects  </span> - Browse my most notable projects.</p>
          <p><span class="text-tertiary-clr font-bold">repo      </span> - This portfolio's source code.</p>
          <p><span class="text-tertiary-clr font-bold">resume    </span> - View / download my CV (FR & EN).</p>
          <p><span class="text-tertiary-clr font-bold">weather   </span> - Real-time weather. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">weather &lt;city&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">whoami    </span> - Who is behind this terminal?</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Fun & Games</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr font-bold">cowsay    </span> - ASCII cow says your message. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">cowsay &lt;msg&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">game      </span> - Frontend Quiz — test your knowledge.</p>
          <p><span class="text-tertiary-clr font-bold">joke      </span> - Random programming joke.</p>
          <p><span class="text-tertiary-clr font-bold">quote     </span> - Inspiring or funny quote.</p>
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
          <p>Type any command to get started!</p>
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
