/**
 * Help Command
 *
 * Display all available commands organized by category.
 * Shows command count, usage tips, keyboard shortcuts, and features.
 *
 * @example
 * ```bash
 * help
 * ```
 */

import { commands } from "@/constants";
import type { CommandHistoryOutputType } from "@/types";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHtmlOutput } from "@/utils/output";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

/**
 * Renders a single command row.
 * @param name    - Command name (padded to a fixed width for alignment).
 * @param desc    - Short description answering "what will I get?".
 * @param usage   - Optional usage syntax shown on a second indented line.
 */
function cmd(name: string, desc: string, usage?: string): string {
  const paddedName = name.padEnd(10);
  const usageLine = usage
    ? `\n          <p class="text-text-clr opacity-sep pl-4">↳ <span class="text-tertiary-clr font-bold">${usage}</span></p>`
    : "";

  return `<p><span class="text-tertiary-clr font-bold">${paddedName}</span> — ${desc}</p>${usageLine}`;
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────
export const handleHelpCommand = (): CommandHistoryOutputType => {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

        <!-- ── Header ─────────────────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">
            Commands
            <span class="text-text-clr opacity-sep">(${commands.length} available)</span>
          </p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>
            Append 
            <span class="text-tertiary-clr font-bold">help</span>,
            <span class="text-tertiary-clr font-bold">--help</span> or
            <span class="text-tertiary-clr font-bold">-h</span> to any command for
            detailed usage, options, and examples.
          </p>

          <p>
            Use <span class="text-tertiary-clr font-bold">man &lt;command&gt;</span> for the full
            manual page — implementation notes, edge cases, and cross-references.
          </p>
        </div>

        <!-- ── Navigation & System ────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Navigation &amp; System</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          ${cmd("alias", "Create persistent command shortcuts — resolved transparently before dispatch.", 'alias [name="command args"]')}
          ${cmd("audio", "Web Audio API sound engine: clicks, chimes, buzzes. Disabled by default.", "audio [on|off|volume &lt;0-100&gt;]")}
          ${cmd("clear", 'Wipe all terminal output and reset the scroll position. Shortcut: <span class="text-tertiary-clr font-bold">Ctrl+L</span>')}
          ${cmd("exit", "Display a farewell message. Close the browser tab to actually quit.")}
          ${cmd("help", "This screen — all commands grouped by category, with keyboard shortcuts.")}
          ${cmd("hostname", "Portfolio host metadata: name, owner, location, uptime.")}
          ${cmd("neofetch", "Full system card: OS, kernel, theme, font, resolution, stack, and journey stats.")}
          ${cmd("theme", "Switch between 31 OKLCH color themes. Preference saved in localStorage.", "theme [name|--random|-r]")}
          ${cmd("typeface", "Switch between 15 monospace fonts, loaded on demand. Preference saved.", "typeface [name|--random|-r]")}
          ${cmd("unalias", "Remove one alias by name, or wipe all aliases at once.", "unalias &lt;name&gt; | --all")}
          ${cmd("welcome", "Replay the startup banner — ASCII art, tagline, and entry tips.")}
          ${cmd("whoami", "One-paragraph summary: who, where, stack, and key milestones.")}
        </div>

        <!-- ── Information ────────────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Information</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          ${cmd("about", "Full narrative: origin story, JavaScript journey, contest podium, internship, stack.")}
          ${cmd("contact", "All social links (email, GitHub, LinkedIn, Twitter, Frontend Mentor) and availability.")}
          ${cmd("date", "Live clock widget — date, time, timezone, and a time-of-day greeting.")}
          ${cmd("time", 'Alias for <span class="text-tertiary-clr font-bold">date</span> — identical live clock output.')}
          ${cmd("email", "Email address rendered as a clickable mailto link.")}
          ${cmd("projects", "Five featured projects: descriptions, tech stack, live demos, and source links.")}
          ${cmd("repo", "Source code link for this portfolio on GitHub.")}
          ${cmd("resume", "CV preview and download in English and French (PDF).")}
          ${cmd("weather", "3-day ASCII forecast from wttr.in for any city in the world.", "weather &lt;city&gt;")}
        </div>

        <!-- ── Network ────────────────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Network</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          ${cmd("curl", "Browser HTTP client: GET/POST/HEAD, custom headers, auth, verbose mode. CORS applies.", "curl [options] &lt;url&gt;")}
          ${cmd("github", 'GitHub profile card: bio, stats, pinned and top repos. Accepts <span class="text-tertiary-clr font-bold">--json</span>.', "github &lt;username&gt;")}
          ${cmd("ip", 'Public IP, ISP, city, country, timezone from ipapi.co. Accepts <span class="text-tertiary-clr font-bold">--json</span>.')}
        </div>

        <!-- ── Utilities ───────────────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Utilities</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          ${cmd("age", "Exact age from a birth date: years, months, days, and next-birthday countdown.", "age &lt;YYYY-MM-DD&gt;")}
          ${cmd("calc", "Full math evaluator via mathjs: arithmetic, trig, units, matrices. Runs locally.", "calc &lt;expression&gt;")}
          ${cmd("color", "Color converter: HEX ↔ RGB ↔ HSL ↔ OKLCH, with a live swatch. Accepts named colors.", "color &lt;#hex | rgb() | hsl() | name&gt;")}
          ${cmd("convert", 'Currency conversion with live ECB rates. 168+ ISO 4217 currencies. Cached. Accepts <span class="text-tertiary-clr font-bold">--json</span>.', "convert &lt;amount&gt; &lt;FROM&gt; &lt;TO&gt;")}
          ${cmd("decode", "Decode text from base64 (default), URL encoding, or hex. Runs locally.", "decode [base64|url|hex] &lt;text&gt;")}
          ${cmd("echo", 'Print text to the terminal. Supports <span class="text-tertiary-clr">\\\\n</span> for newlines.', "echo &lt;text&gt;")}
          ${cmd("encode", "Encode text as base64 (default), URL encoding, or hex. Runs locally.", "encode [base64|url|hex] &lt;text&gt;")}
          ${cmd("hash", "Cryptographic hash via Web Crypto API: SHA-256 (default), 512, 384, SHA-1.", "hash [sha256|sha512|sha384|sha1] &lt;text&gt;")}
          ${cmd("history", "Last <em>n</em> commands from session history (default 20, max 50).", "history [n]")}
          ${cmd("man", "Full manual pages — deeper than --help: notes, edge cases, cross-references.", "man &lt;command&gt;")}
          ${cmd("note", "Persistent note manager: add, edit, delete, or clear. Stored in localStorage.", "note [add|rm|edit|clear] [args]")}
          ${cmd("snippet", "Code snippet vault with syntax highlighting via highlight.js.", "snippet [add|show|rm|clear] [args]")}
          ${cmd("timer", 'Live countdown in the terminal. Supports <span class="text-tertiary-clr">25m</span>, <span class="text-tertiary-clr">1h30m</span>, <span class="text-tertiary-clr">90s</span> formats.', "timer &lt;duration&gt; [label]")}
          ${cmd("todo", "Persistent task list with done/pending states.", "todo [add|done|undone|rm|clear] [args]")}
          ${cmd("uuid", "Generate v4 (random) or v1 (time-based) UUIDs in batch, or validate any UUID.", "uuid [v1|v4] [count] | validate &lt;string&gt;")}
        </div>

        <!-- ── Fun & Games ─────────────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Fun &amp; Games</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          ${cmd("cowsay", "ASCII cow speech bubble. A tribute to the Unix classic.", "cowsay &lt;message&gt;")}
          ${cmd("game", "40-question Frontend quiz: HTML/CSS/JS/React/TS. XP system, 4 rank tiers.", "game [1-3 | stats | reset]")}
          ${cmd("joke", 'Random two-part programming joke fetched from JokeAPI v2. Accepts <span class="text-tertiary-clr font-bold">--json</span>.')}
          ${cmd("quote", 'Random piece of practical advice from the Advice Slip API. Accepts <span class="text-tertiary-clr font-bold">--json</span>.')}
          ${cmd("rps", "Rock-paper-scissors against the terminal.", "rps [rock|paper|scissors]")}
          ${cmd("sudo", "Attempt to gain root access. You already know what happens. 😄")}
        </div>

        <!-- ── Keyboard Shortcuts ──────────────────────────────── -->
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Keyboard Shortcuts</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">[Tab]      </span> — Autocomplete command or argument. Cycles through all matches.</p>
          <p><span class="text-tertiary-clr font-bold">[↑] [↓]    </span> — Navigate history, or move through the suggestions panel when open.</p>
          <p><span class="text-tertiary-clr font-bold">[Esc]      </span> — Dismiss the suggestions panel and restore input focus.</p>
          <p><span class="text-tertiary-clr font-bold">[Enter]    </span> — Execute the current command.</p>
          <p><span class="text-tertiary-clr font-bold">[Ctrl + L] </span> — Clear the terminal screen.</p>
          <p><span class="text-tertiary-clr font-bold">[Ctrl + R] </span> — Reverse incremental search through command history.</p>
          <p><span class="text-tertiary-clr font-bold">[Ctrl + C] </span> — Cancel a running command (active only while loading).</p>
        </div>

        <!-- ── Footer ─────────────────────────────────────────── -->
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>
            New here? Try
            ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">about</span>${DT.decorators.quote} to read the story,
            ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">projects</span>${DT.decorators.quote} to see the work, or
            ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">neofetch</span>${DT.decorators.quote} for the full system card.
          </p>

          <p class="text-text-clr opacity-sep">
            <span class="text-primary-clr">Tip:</span>
            Tab completion is available for every command and most arguments.
          </p>
        </div>

      </div>`,
  );
};
