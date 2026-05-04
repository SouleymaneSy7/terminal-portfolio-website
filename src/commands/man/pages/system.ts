import { ManPageType } from "@/types"

export const SYSTEM_PAGES: Record<string, ManPageType> = {
  audio: {
    name: "audio",
    synopsis: "audio\naudio on\naudio off\naudio volume <0-100>",
    description:
      "Controls keyboard sound effects generated via the Web Audio API. Sounds are synthesized programmatically — no audio files, no network requests. Each key category has a distinct sound: normal keypresses use a short sine click, Enter triggers a two-tone chime, Backspace a lower click, Tab a soft ascending chime, Escape a descending chime, Ctrl a square-wave tick, command errors a short noise burst, and successful commands a three-note ascending arpeggio.",
    options: `
    <p><span class="text-tertiary-clr font-bold">audio              </span> - Display current status and volume bar.</p>
    <p><span class="text-tertiary-clr font-bold">audio on           </span> - Enable keyboard sounds and play a confirmation chime.</p>
    <p><span class="text-tertiary-clr font-bold">audio off          </span> - Disable all keyboard sounds silently.</p>
    <p><span class="text-tertiary-clr font-bold">audio volume &lt;n&gt; </span> - Set volume 0–100. Plays a keypress sound as immediate feedback.</p>`,
    examples: `
    <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  audio on</p>
    <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  audio volume 60</p>
    <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  audio off</p>
    <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  audio volume 0   (mute sans désactiver)</p>`,
    notes:
      "Audio is disabled by default — it requires explicit opt-in. The AudioContext is created lazily on first keypress after enabling, satisfying browser autoplay policies. On iOS Safari, the context may suspend between interactions — it is automatically resumed on the next keydown. Respects prefers-reduced-motion: if the user has requested reduced motion, no sounds will play regardless of the audio setting.",
    seeAlso: ["theme", "typeface"],
  },
  clear: {
    name: "clear",
    synopsis: "clear",
    description:
      "Clears all output from the terminal viewport and resets the localStorage command history to an empty array. This is equivalent to pressing Ctrl+L at any time. The command does not produce any output itself.",
    notes:
      "Keyboard shortcut: Ctrl+L. The clear action is handled before the registry lookup — it bypasses the normal command dispatch path and calls clearHistory() directly in Terminal.tsx.",
    seeAlso: ["welcome", "help"],
  },

  date: {
    name: "date",
    synopsis: "date\ntime",
    description:
      "Displays a live real-time clock rendered as a box-drawing frame with DATE, TIME, and ZONE rows that update every second via a React interval. The greeting message below the frame changes based on the current hour (morning / afternoon / evening). 'time' is an alias that produces identical output.",
    notes:
      "The clock component uses React state + setInterval — it ticks client-side without any network request. The timezone string is obtained from Intl.DateTimeFormat().resolvedOptions().timeZone. The ● LIVE indicator uses the animate-pulse-live CSS animation defined in globals.css.",
    seeAlso: ["timer", "age", "hostname"],
  },

  exit: {
    name: "exit",
    synopsis: "exit",
    description:
      "Displays a farewell message with a brief reflection on the self-taught journey and an invitation to reach out. Unlike a real shell, it does not close the tab — that requires the user to close the browser tab manually. The command is purely cosmetic.",
    notes:
      "To actually leave: close the browser tab. The goodbye output is a regular HTML block — history-navigation still works after running it.",
    seeAlso: ["clear", "welcome"],
  },

  help: {
    name: "help",
    synopsis: "help",
    description:
      "Displays the full command reference grouped by category: Navigation & System, Network, Information, Utilities, and Fun & Games. Each entry shows the command name, a one-line description, and usage syntax where applicable. A tip reminds users that every command accepts --help for detailed usage.",
    notes:
      "The command count shown in the header (e.g. '42 total') is derived dynamically from the commands[] array in constants/commands.ts — it updates automatically whenever a new command is added.",
    seeAlso: ["man", "welcome"],
  },

  history: {
    name: "history",
    synopsis: "history [n]",
    description:
      "Lists the most recent terminal commands from the session history, read directly from the 'terminal:command-history' localStorage key. Commands are numbered with their absolute position in the full history. The default shows the last 20 entries; a custom count can be requested up to 50.",
    options: `
      <p><span class="text-tertiary-clr font-bold">history      </span> - Show last 20 commands (default).</p>
      <p><span class="text-tertiary-clr font-bold">history &lt;n&gt; </span> - Show last n commands (1–50).</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  history</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  history 10</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  history 50</p>`,
    notes:
      "Keyboard navigation: [↑↓] steps through history one command at a time. Ctrl+R opens the interactive reverse-i-search mode inside CommandInput.tsx, which searches history in real time as you type. The history command itself is excluded from its own output.",
    seeAlso: ["help", "man"],
  },

  hostname: {
    name: "hostname",
    synopsis: "hostname",
    description:
      "Displays the portfolio hostname, the owner's name, location, and uptime since 2025. A simplified, portfolio-specific analogue of the classic Unix hostname command — no dynamic system information, just static portfolio metadata.",
    notes:
      "For the full Linux-style system summary including theme, font, resolution, and package counts, use neofetch.",
    seeAlso: ["neofetch", "whoami", "date"],
  },

  man: {
    name: "man",
    synopsis: "man [command]",
    description:
      "Displays the manual page for a registered command, following a Unix man page structure: NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES, NOTES, and SEE ALSO. Running man with no argument lists all available manual pages. Every command in this terminal has an entry.",
    options: `
      <p><span class="text-tertiary-clr font-bold">man           </span> - List all available manual pages.</p>
      <p><span class="text-tertiary-clr font-bold">man &lt;command&gt; </span> - Display the manual page for the named command.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  man curl</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  man theme</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  man game</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  man calc</p>`,
    notes:
      "For commands not yet covered by man, the quick usage reference is always available via &lt;command&gt; --help. Man pages go deeper: they document implementation details, edge cases, and cross-references that --help omits.",
    seeAlso: ["help"],
  },

  neofetch: {
    name: "neofetch",
    synopsis: "neofetch",
    description:
      "Displays a Linux-style system summary beside the ASCII portfolio logo: OS, Host, Kernel, Shell, DE, active theme, active font, screen resolution, uptime, and package counts (prod + dev). Theme and font labels are read live from the html[data-theme] and html[data-font] attributes, so they always reflect the current session state.",
    notes:
      "Resolution is obtained from window.screen.availWidth × window.screen.availHeight. Package counts come from package.json imported at build time. The color swatch row at the bottom demonstrates all four semantic color tokens in both full and muted variants.",
    seeAlso: ["hostname", "whoami", "theme", "typeface"],
  },

  theme: {
    name: "theme",
    synopsis: "theme [name]",
    description:
      "Switches the terminal color theme instantly. All 31 themes use OKLCH color values for perceptually uniform contrast, derived from official palette hex codes. The chosen theme is written to localStorage ('terminal:theme') and restored on every page load via initThemeAndFont(). Running neofetch after switching shows the live theme name.",
    options: `
      <p><span class="text-tertiary-clr font-bold">theme           </span> - List all 31 themes grouped by family (Catppuccin, Popular Dark, Editor Classics, Material, Others).</p>
      <p><span class="text-tertiary-clr font-bold">theme &lt;name&gt;    </span> - Apply the named theme immediately — all colors update without a page reload.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  theme dracula</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  theme catppuccin-mocha</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  theme material-high-contrast</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  theme [Tab]  — cycle all 31 names in grouped suggestions</p>`,
    notes:
      "Themes are applied by setting the data-theme attribute on &lt;html&gt;, which triggers CSS attribute selectors at specificity (0,1,1) — higher than :root (0,1,0), no !important needed. Tab completion displays themes grouped by family with an inline description for the highlighted item.",
    seeAlso: ["typeface", "neofetch", "color"],
  },

  time: {
    name: "time",
    synopsis: "time",
    description:
      "Alias for the date command. Produces an identical live clock output — DATE, TIME, and ZONE rows in a box-drawing frame, updating every second. Both names are registered separately in the command registry and listed in help.",
    seeAlso: ["date", "timer"],
  },

  typeface: {
    name: "typeface",
    synopsis: "typeface [name]",
    description:
      "Switches the terminal monospace font. 15 fonts available: 1 loaded statically (Cascadia Code), 8 from Google Fonts, 1 from npm package (Geist Mono), and 5 local fonts. Fonts are loaded dynamically on demand for optimal performance. The chosen font is written to localStorage ('terminal:font') and restored on every page load. Font switching is implemented via html[data-font] CSS attribute selectors.",
    options: `
      <p><span class="text-tertiary-clr font-bold">typeface               </span> - List all 15 fonts with descriptions.</p>
      <p><span class="text-tertiary-clr font-bold">typeface &lt;name&gt;        </span> - Apply the named font immediately.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  typeface fira</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  typeface geist</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  typeface recursive-casual</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  typeface cascadia   (default)</p>`,
    notes:
      "Available fonts: cascadia (Cascadia Code), fira (Fira Code), geist (Geist Mono), recursive-casual (Recursive Casual Mono). All use adjustFontFallback: false to avoid a Turbopack build error.",
    seeAlso: ["theme", "neofetch"],
  },

  welcome: {
    name: "welcome",
    synopsis: "welcome",
    description:
      "Re-displays the terminal welcome screen: the large ASCII banner of 'SOULEYMANE SY', a divider, the welcome text, and hints to type 'about' or 'help'. This is the same output produced automatically when the terminal first loads into a fresh session.",
    notes:
      "The welcome output is also the first entry in history when localStorage is empty. Running 'welcome' again appends a new instance — it does not scroll back to the original.",
    seeAlso: ["help", "about", "clear"],
  },

  whoami: {
    name: "whoami",
    synopsis: "whoami",
    description:
      "Displays a concise identity summary: who Souleymane Sy is, where he's based, his specialization, headline stats (repos, challenges), and key achievements (contest podium, internship distinction). A lighter-weight alternative to about for a quick overview.",
    notes:
      "Output is a single block — brief by design. For the full narrative with context and reflections, use about. For social links and availability, use contact.",
    seeAlso: ["about", "contact", "neofetch"],
  },
}
