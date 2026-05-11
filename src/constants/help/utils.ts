/**
 * Help outputs for utility commands.
 */

import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createHelpOutput } from "@/utils/output";

export const AGE_HELP = createHelpOutput({
  name: "age — Age Calculator",
  usage: `age <span class="text-tertiary-clr">&lt;date&gt;</span>`,
  description: "Calculate your exact age from a birth date.",
  options: [{ flag: "--help, -h", description: "Show this help message" }],
  examples: [
    { command: "age 1990-01-15", description: "ISO format (preferred)" },
    { command: "age 15/01/1990", description: "European format" },
    { command: "age 01/15/1990", description: "American format" },
    { command: "age 15-01-1990", description: "Dash-separated" },
    { command: "age 1990/01/15", description: "Slash-separated ISO" },
  ],
});

export const CALC_HELP = createHelpOutput({
  name: "calc — Mathematical Expression Evaluator",
  usage: `<span class="text-tertiary-clr font-bold">calc &lt;expression&gt;</span>`,
  description:
    "Evaluate a mathematical expression using math.js. All computation runs locally in your browser — no data is sent anywhere.",
  options: [{ flag: "--help", description: "Show this help message" }],
  examples: [
    { command: "calc 2 + 2", description: "Basic arithmetic" },
    { command: "calc sqrt(144)", description: "Square root" },
    { command: "calc sin(pi / 2)", description: "Trigonometry" },
    { command: "calc (12 + 3) * 4 / 2", description: "Grouped expression" },
    { command: "calc 100 degF to degC", description: "Unit conversion" },
    { command: "calc log(1000, 10)", description: "Logarithm" },
    { command: "calc 5 km to m", description: "Distance conversion" },
  ],
  notes: `Supported: arithmetic <span class="text-tertiary-clr">+ - * / ^ %</span>, functions <span class="text-tertiary-clr">sqrt abs ceil floor round log</span>, trig <span class="text-tertiary-clr">sin cos tan</span>, constants <span class="text-tertiary-clr">pi e phi tau</span>, units, bitwise <span class="text-tertiary-clr">&amp; | ^ ~ &lt;&lt; &gt;&gt;</span>`,
});

export const COLOR_HELP = createHelpOutput({
  name: "color",
  usage: "color <value>",
  description: "Convert a color between hex, rgb, hsl, and oklch formats.",
  options: [
    { flag: "#rrggbb", description: "Hex (6-digit)" },
    { flag: "#rgb", description: "Hex (3-digit shorthand)" },
    { flag: "rgb(r, g, b)", description: "RGB 0–255" },
    { flag: "hsl(h, s, l)", description: "HSL (degrees, percent, percent)" },
    { flag: "name", description: "Named color (red, coral, navy…)" },
  ],
  examples: [
    { command: "color #ff6b6b", description: "Convert hex color" },
    { command: "color rgb(255, 107, 107)", description: "Convert RGB color" },
    { command: "color hsl(0, 100%, 71%)", description: "Convert HSL color" },
    { command: "color coral", description: "Convert named color" },
  ],
});

export const CONVERT_HELP = createHelpOutput({
  name: "convert — Currency Conversion",
  description: "Real-time currency conversion powered by the European Central Bank.",
  usage: `<span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span>`,
  examples: [
    {
      command: "convert 100 USD EUR",
      description: "Convert 100 USD to EUR",
    },
    { command: "convert 50 EUR GBP", description: "Convert 50 EUR to GBP" },
    {
      command: "convert 1000 JPY USD",
      description: "Convert 1000 JPY to USD",
    },
    {
      command: "convert list",
      description: "List all supported currencies",
    },
  ],
  notes: "Currency codes are ISO 4217 (e.g. USD, EUR, GBP, JPY).",
  seeAlso: ["convert list"],
});

export const ECHO_HELP = createHelpOutput({
  name: "echo",
  usage: "echo [text]",
  description: "Output text to the terminal. Supports \\\\n for newlines.",
  examples: [
    { command: "echo Hello, World!", description: " - Print simple text" },
    {
      command: "echo I love TypeScript",
      description: "Print multiple words",
    },
    { command: "echo Line 1\\\\nLine 2", description: " - Print with newline" },
  ],
});

export const ENCODE_HELP = createHelpOutput({
  name: "encode — Usage",
  description: "Encode text using the specified format.",
  usage: `<span class="text-tertiary-clr font-bold">encode [format] &lt;text&gt;</span>  <span class="text-secondary-clr">Default: base64</span>`,
  options: [
    {
      flag: "base64",
      description: "Base64 — default, safe for all text including unicode",
    },
    { flag: "url", description: "URL percent-encoding (encodeURIComponent)" },
    { flag: "hex", description: "Hexadecimal byte representation" },
  ],
  examples: [
    {
      command: "encode Hello World",
      description: "Encode with default base64",
    },
    {
      command: "encode base64 Hello World",
      description: "Encode explicitly as base64",
    },
    {
      command: "encode url https://example.com/?q=hello world",
      description: "URL-encode a string",
    },
    { command: "encode hex Hello", description: "Encode as hex bytes" },
  ],
  notes: "All operations run locally in your browser — no data is sent anywhere.",
});

export const DECODE_HELP = createHelpOutput({
  name: "decode — Usage",
  description: "Decode text from the specified format.",
  usage: `<span class="text-tertiary-clr font-bold">decode [format] &lt;text&gt;</span>  <span class="text-secondary-clr">Default: base64</span>`,
  options: [
    {
      flag: "base64",
      description: "Base64 — default, safe for all text including unicode",
    },
    { flag: "url", description: "URL percent-encoding (decodeURIComponent)" },
    { flag: "hex", description: "Hexadecimal byte representation" },
  ],
  examples: [
    { command: "decode SGVsbG8gV29ybGQ=", description: "Decode base64 string" },
    {
      command: "decode base64 SGVsbG8gV29ybGQ=",
      description: "Decode explicitly as base64",
    },
    {
      command: "decode url hello%20world",
      description: "Decode URL-encoded string",
    },
    { command: "decode hex 48656c6c6f", description: "Decode hex bytes" },
  ],
  notes: "All operations run locally in your browser — no data is sent anywhere.",
});

export const GITHUB_HELP = createHelpOutput({
  name: "github",
  usage: "github &lt;username&gt;",
  description: "Display a GitHub user's profile, stats and top repos.",
  examples: [
    {
      command: "github SouleymaneSy7",
      description: "View SouleymaneSy7's profile",
    },
    { command: "github torvalds", description: "View torvalds' profile" },
    { command: "github gaearon", description: "View gaearon's profile" },
  ],
  notes: "Uses the public GitHub REST API — 60 requests/hour unauthenticated.",
});

export const HASH_HELP = createHelpOutput({
  name: "hash",
  usage: "hash [algorithm] <text>",
  description: "Generate a cryptographic hash of any text using the Web Crypto API.",
  options: [
    {
      flag: "sha256",
      description: "SHA-256 (default) — 256-bit output, widely used",
    },
    { flag: "sha512", description: "SHA-512 — 512-bit output, stronger" },
    { flag: "sha384", description: "SHA-384 — 384-bit output" },
    { flag: "sha1", description: "SHA-1 — legacy, 160-bit output" },
  ],
  examples: [
    { command: "hash Hello World", description: "Hash with default SHA-256" },
    {
      command: "hash sha256 Hello World",
      description: "Hash with SHA-256 explicitly",
    },
    {
      command: "hash sha512 my secret phrase",
      description: "Hash with SHA-512",
    },
    { command: "hash sha1 legacy input", description: "Hash with SHA-1" },
  ],
  notes: "Hashing runs entirely in your browser — no data is sent to any server.",
});

export const HISTORY_HELP = createHelpOutput({
  name: "history",
  description: "Display recent command history.",
  usage: `<span class="text-tertiary-clr font-bold">history [n]</span>`,
  options: [{ flag: "--help, -h", description: "Show this help message" }],
  examples: [
    { command: "history", description: "Show last 20 commands" },
    { command: "history 10", description: "Show last 10 commands" },
    { command: "history 50", description: "Show last 50 commands" },
  ],
  notes: `Default: last 20 commands. Maximum: 50 entries.`,
});

export const IP_HELP = createHelpOutput({
  name: "ip",
  description: "Display your public IP address and geolocation information.",
  usage: `<span class="text-tertiary-clr font-bold">ip</span>`,
  notes: `Your IP is fetched via <span class="text-tertiary-clr">ipapi.co</span>. If you're using a VPN or proxy, the detected IP will be that of your VPN/proxy.`,
});

export const NOTE_HELP = createHelpOutput({
  name: "note",
  usage: "note <add|rm|edit|clear>",
  description: "Persistent note manager (saved in localStorage).",
  options: [
    { flag: "add <text>", description: "Add a new note" },
    { flag: "rm <id>", description: "Remove a note by ID" },
    { flag: "edit <id> <text>", description: "Edit an existing note" },
    { flag: "clear", description: "Delete all notes" },
    { flag: "list", description: "List all notes (default)" },
  ],
  examples: [
    { command: "note add Buy milk", description: "Add a new note" },
    { command: "note rm 3", description: "Remove note with ID 3" },
    { command: "note edit 2 Updated text", description: "Edit note with ID 2" },
    { command: "note clear", description: "Clear all notes" },
  ],
});

export const SNIPPET_HELP = createHelpOutput({
  name: "snippet — Code Snippet Manager",
  usage: "snippet [subcommand] [args]",
  description: "Save, view, and manage code snippets in your browser.",
  options: [
    { flag: "snippet", description: "List all saved snippets" },
    {
      flag: "snippet add &lt;name&gt; &lt;lang&gt; &lt;code&gt;",
      description: "Save a new snippet",
    },
    { flag: "snippet show &lt;id&gt;", description: "Display snippet code" },
    {
      flag: "snippet rm &lt;id&gt;",
      description: "Delete a snippet by its short ID",
    },
    { flag: "snippet clear", description: "Delete all snippets" },
    { flag: "snippet help", description: "Show this guide" },
  ],
  examples: [
    {
      command: "snippet add fibonacci js const fib = n =&gt; n &lt;= 1 ? n : fib(n-1) + fib(n-2)",
      description: "Save a JS snippet named 'fibonacci'",
    },
    {
      command: "snippet show a1b2c3",
      description: "Display snippet with ID a1b2c3",
    },
    {
      command: "snippet rm a1b2c3",
      description: "Delete snippet with ID a1b2c3",
    },
  ],
  notes: "Snippets persist in your browser across sessions.",
});

export const TIMER_HELP = createHelpOutput({
  name: "timer — Countdown Timer",
  usage: `timer <span class="text-tertiary-clr">&lt;duration&gt;</span> [label]`,
  description: "Start a countdown timer directly in the terminal.",
  options: [{ flag: "--help, -h", description: "Show this help message" }],
  examples: [
    { command: "timer 25m", description: "25-minute timer" },
    { command: "timer 25m Pomodoro", description: "Named timer" },
    { command: "timer 1h30m Deep work", description: "1 hour 30 minutes" },
    { command: "timer 90s", description: "90 seconds" },
    { command: "timer 3600", description: "3600 seconds (bare number)" },
  ],
  notes: `Duration units: <span class="text-tertiary-clr">h</span> hours ${DT.decorators.bullet} <span class="text-tertiary-clr">m</span> minutes ${DT.decorators.bullet} <span class="text-tertiary-clr">s</span> seconds. Max: 24h.`,
});

export const TODOS_HELP = createHelpOutput({
  name: "todo — Command Reference",
  description: "In-terminal task manager. Tasks persist across sessions.",
  usage: `<span class="text-tertiary-clr font-bold">todo</span> <span class="text-secondary-clr">[subcommand]</span> <span class="text-text-clr">[args]</span>`,
  options: [
    { flag: "todo", description: "List all tasks" },
    { flag: "todo add &lt;text&gt;", description: "Add a new task" },
    { flag: "todo done &lt;id&gt;", description: "Mark task as completed" },
    { flag: "todo undone &lt;id&gt;", description: "Mark task as pending" },
    { flag: "todo rm &lt;id&gt;", description: "Delete a task" },
    { flag: "todo clear", description: "Delete all tasks" },
    { flag: "todo help", description: "Show this guide" },
  ],
  notes: "Tasks persist in your browser across sessions.",
});

export const UUID_HELP = createHelpOutput({
  name: "uuid",
  usage: "uuid [v1|v4] [count]",
  description: "Generate and validate UUIDs (v1 time-based or v4 random).",
  options: [
    { flag: "uuid", description: "Generate one v4 UUID" },
    { flag: "uuid v1 [n]", description: "Generate n v1 UUIDs (max 20)" },
    { flag: "uuid v4 [n]", description: "Generate n v4 UUIDs (max 20)" },
    { flag: "uuid validate <string>", description: "Validate a UUID string" },
  ],
  examples: [
    { command: "uuid", description: "Generate one v4 UUID" },
    { command: "uuid v4", description: "Generate one v4 UUID" },
    { command: "uuid v4 10", description: "Generate 10 v4 UUIDs" },
    { command: "uuid v1 5", description: "Generate 5 v1 UUIDs" },
    {
      command: "uuid validate 550e8400-e29b-41d4-a716-446655440000",
      description: "Validate a UUID",
    },
  ],
});
