import { ManPageType } from "@/types"

export const UTILITY_PAGES: Record<string, ManPageType> = {
  age: {
    name: "age",
    synopsis: "age <date>",
    description:
      "Calculates exact age from a birth date using date-fns arithmetic. Returns the number of years, months, and days elapsed, the day of the week the person was born on, and a countdown to the next birthday (or a 🎂 greeting if it is today). Five date formats are recognized — the ISO format is preferred.",
    options: `
      <p><span class="text-tertiary-clr font-bold">yyyy-MM-dd   </span> - ISO 8601 — preferred. e.g. 1990-01-15</p>
      <p><span class="text-tertiary-clr font-bold">dd/MM/yyyy   </span> - European. e.g. 15/01/1990</p>
      <p><span class="text-tertiary-clr font-bold">MM/dd/yyyy   </span> - American. e.g. 01/15/1990</p>
      <p><span class="text-tertiary-clr font-bold">dd-MM-yyyy   </span> - Dash-separated. e.g. 15-01-1990</p>
      <p><span class="text-tertiary-clr font-bold">yyyy/MM/dd   </span> - Slash-ISO. e.g. 1990/01/15</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  age 1990-01-15</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  age 15/01/1990</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  age 2000-06-21</p>`,
    notes:
      "Dates in the future are rejected. The age calculation uses date-fns differenceInYears / differenceInMonths / differenceInDays and correctly handles leap years and month-boundary edge cases.",
    seeAlso: ["date", "calc"],
  },

  calc: {
    name: "calc",
    synopsis: "calc <expression>",
    description:
      "Evaluates a mathematical expression using the math.js library, which runs entirely in the browser with no network calls. Supports arithmetic, algebra, trigonometry, unit conversions, bitwise operations, and matrix math. Output is formatted to 14 significant figures with automatic notation switching between fixed and scientific.",
    options: `
      <p><span class="text-tertiary-clr font-bold">Arithmetic    </span> - + − * / ^ % (integer div: //)</p>
      <p><span class="text-tertiary-clr font-bold">Functions     </span> - sqrt, abs, ceil, floor, round, log, log2, log10, exp</p>
      <p><span class="text-tertiary-clr font-bold">Trigonometry  </span> - sin, cos, tan, asin, acos, atan, atan2 (radians)</p>
      <p><span class="text-tertiary-clr font-bold">Constants     </span> - pi, e, phi, tau, Infinity</p>
      <p><span class="text-tertiary-clr font-bold">Units         </span> - 5 km to m  ·  100 degF to degC</p>
      <p><span class="text-tertiary-clr font-bold">Bitwise       </span> - &amp; | ^ ~ &lt;&lt; &gt;&gt;</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  calc 2 + 2</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  calc sqrt(144)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  calc sin(pi / 2)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  calc (12 + 3) * 4 / 2</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  calc 100 degF to degC</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  calc log(1000, 10)</p>`,
    notes:
      "math.js evaluate() is sandboxed — no access to globals, filesystem, or network. Results longer than 500 characters are truncated with an ellipsis. Division by zero returns Infinity, not an error.",
    seeAlso: ["hash", "uuid", "convert"],
  },

  color: {
    name: "color",
    synopsis: "color <value>",
    description:
      "Converts a color between four representations: hexadecimal, RGB, HSL, and OKLCH. Also accepts 30+ CSS named colors. The OKLCH conversion uses the full perceptual pipeline (sRGB → linear → XYZ D65 → OKLab → OKLCH), the same color space used in this terminal's 31-theme system. A contrast-aware inline swatch is displayed using the computed hex value.",
    options: `
      <p><span class="text-tertiary-clr font-bold">#rrggbb      </span> - 6-digit hex — most common.</p>
      <p><span class="text-tertiary-clr font-bold">#rgb         </span> - 3-digit shorthand hex.</p>
      <p><span class="text-tertiary-clr font-bold">rgb(r, g, b) </span> - RGB channels 0–255.</p>
      <p><span class="text-tertiary-clr font-bold">hsl(h, s, l) </span> - Hue 0–360°, saturation/lightness 0–100%.</p>
      <p><span class="text-tertiary-clr font-bold">name         </span> - Named color (red, coral, navy, gold, turquoise…).</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  color #ff6b6b</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  color rgb(255, 107, 107)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  color hsl(0, 100%, 71%)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  color coral</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  color navy</p>`,
    notes:
      "30+ named colors are supported. The WCAG relative-luminance formula is used to decide whether the swatch text should be black or white. OKLCH output values are suitable for direct use in globals.css theme overrides.",
    seeAlso: ["theme"],
  },

  convert: {
    name: "convert",
    synopsis: "convert <amount> <from> <to>\nconvert list",
    description:
      "Converts amounts between world currencies using real-time exchange rates from the European Central Bank via frankfurter.dev. Supports 168+ currencies with ISO 4217 codes, displays currency names and symbols, and caches the full currency list in memory for the browser session to avoid redundant network requests.",
    options: `
      <p><span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt; </span> - Convert between two currencies.</p>
      <p><span class="text-tertiary-clr font-bold">convert list                    </span> - List all 168+ supported currencies with names and symbols.</p>
      <p><span class="text-tertiary-clr font-bold">convert help                    </span> - Show command reference.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  convert 100 USD EUR</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  convert 50 EUR GBP</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  convert 1000 JPY USD</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  convert 50000 GNF USD</p>`,
    notes:
      "Currency codes are ISO 4217. The ECB does not publish rates for cryptocurrencies. Rates update once per trading day. The currency list is fetched once per session and memoized in convertService.",
    seeAlso: ["ip"],
  },

  decode: {
    name: "decode",
    synopsis: "decode [format] <text>",
    description:
      "Decodes text from Base64 (default), URL percent-encoding, or hexadecimal. The inverse of encode. All operations run locally in the browser — no data is transmitted. Unicode is fully supported in Base64 mode via TextDecoder.",
    options: `
      <p><span class="text-tertiary-clr font-bold">base64  </span> - Base64 — default. Handles UTF-8 safely via TextDecoder.</p>
      <p><span class="text-tertiary-clr font-bold">url     </span> - URL percent-decoding (decodeURIComponent).</p>
      <p><span class="text-tertiary-clr font-bold">hex     </span> - Hexadecimal bytes back to UTF-8 text.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  decode SGVsbG8gV29ybGQ=</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  decode base64 SGVsbG8gV29ybGQ=</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  decode url hello%20world</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  decode hex 48656c6c6f</p>`,
    notes:
      "Invalid Base64 strings throw a descriptive error. Hex strings must be an even number of [0-9a-fA-F] characters. URL decoding uses the native decodeURIComponent — malformed sequences are caught and reported.",
    seeAlso: ["encode", "hash"],
  },

  encode: {
    name: "encode",
    synopsis: "encode [format] <text>",
    description:
      "Encodes text using Base64 (default), URL percent-encoding, or hexadecimal. All operations run locally — no data is transmitted. Unicode is handled safely in Base64 mode via TextEncoder before btoa, avoiding the classic 'character out of range' failure.",
    options: `
      <p><span class="text-tertiary-clr font-bold">base64  </span> - Base64 — default. Safe for binary data in text contexts.</p>
      <p><span class="text-tertiary-clr font-bold">url     </span> - URL percent-encoding (encodeURIComponent).</p>
      <p><span class="text-tertiary-clr font-bold">hex     </span> - Hexadecimal byte representation of the UTF-8 encoded text.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  encode Hello World</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  encode base64 Hello World</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  encode url https://example.com/?q=hello world</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  encode hex Bonjour</p>`,
    notes:
      "Outputs longer than 80 characters are shown twice — a truncated preview and a full-output section below it. The format keyword is optional; if omitted, base64 is assumed.",
    seeAlso: ["decode", "hash"],
  },

  hash: {
    name: "hash",
    synopsis: "hash [algorithm] <text>",
    description:
      "Generates a cryptographic hash of any text using the browser's native Web Crypto API. Input is UTF-8 encoded via TextEncoder before hashing. Output is hexadecimal, grouped into 8-character blocks for readability, with the bit-length reported. All computation is local — no data leaves the browser.",
    options: `
      <p><span class="text-tertiary-clr font-bold">sha256  </span> - SHA-256 (default) — 256 bits. The recommended choice for most purposes.</p>
      <p><span class="text-tertiary-clr font-bold">sha512  </span> - SHA-512 — 512 bits. Stronger output, longer string.</p>
      <p><span class="text-tertiary-clr font-bold">sha384  </span> - SHA-384 — 384 bits.</p>
      <p><span class="text-tertiary-clr font-bold">sha1    </span> - SHA-1 — 160 bits. Legacy; not recommended for security.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  hash Hello World</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  hash sha256 Hello World</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  hash sha512 my secret phrase</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  hash sha1 legacy-input</p>`,
    notes:
      "MD5 is not available in the Web Crypto API (cryptographically broken). SHA-1 is included only for legacy compatibility — prefer SHA-256 or SHA-512 for any security-relevant purpose.",
    seeAlso: ["encode", "uuid"],
  },

  note: {
    name: "note",
    synopsis: "note [subcommand] [args]",
    description:
      "A persistent note manager stored in localStorage under 'terminal:notes'. Notes are assigned a random short 6-character ID (derived from the first 6 hex characters of a UUID, hyphens removed) for quick reference. Spaces are allowed in note text — the full remaining argument string is used.",
    options: `
      <p><span class="text-tertiary-clr font-bold">note                      </span> - List all notes with IDs and text.</p>
      <p><span class="text-tertiary-clr font-bold">note add &lt;text&gt;           </span> - Create a note. Multi-word text is fully supported.</p>
      <p><span class="text-tertiary-clr font-bold">note rm &lt;id&gt;              </span> - Delete by short ID.</p>
      <p><span class="text-tertiary-clr font-bold">note edit &lt;id&gt; &lt;newtext&gt; </span> - Replace note text in place; updatedAt is refreshed.</p>
      <p><span class="text-tertiary-clr font-bold">note clear                </span> - Delete all notes (localStorage key removed).</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  note add Read the man page for curl</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  note</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  note edit a3f2bc Follow up with recruiter</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  note rm a3f2bc</p>`,
    notes:
      "Notes survive page refreshes and browser restarts as long as localStorage is available. Clearing browser storage or running 'note clear' is permanent. There is no undo.",
    seeAlso: ["todo", "snippet"],
  },

  snippet: {
    name: "snippet",
    synopsis: "snippet [subcommand] [args]",
    description:
      "Stores and retrieves code snippets in localStorage under 'terminal:snippets'. Each snippet has a name, language tag, and code body. Snippet IDs are short 6-character hex strings. Code is HTML-escaped before rendering to prevent XSS in the pre block.",
    options: `
      <p><span class="text-tertiary-clr font-bold">snippet                            </span> - List all snippets with ID, name, and language.</p>
      <p><span class="text-tertiary-clr font-bold">snippet add &lt;name&gt; &lt;lang&gt; &lt;code&gt;  </span> - Save a snippet. Code spans the remaining arguments.</p>
      <p><span class="text-tertiary-clr font-bold">snippet show &lt;id&gt;                 </span> - Display the snippet code in a pre block.</p>
      <p><span class="text-tertiary-clr font-bold">snippet rm &lt;id&gt;                   </span> - Delete a snippet by its short ID.</p>
      <p><span class="text-tertiary-clr font-bold">snippet clear                      </span> - Delete all snippets.</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  snippet add fib js const fib = n => n &lt;= 1 ? n : fib(n-1) + fib(n-2)</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  snippet</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  snippet show a3f2bc</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  snippet rm a3f2bc</p>`,
    notes:
      "There is no edit subcommand — delete and re-add to update a snippet. Snippets survive page refreshes. The language tag is stored as-is (lowercased), used only for display — no syntax highlighting is applied.",
    seeAlso: ["note", "todo"],
  },

  timer: {
    name: "timer",
    synopsis: "timer <duration> [label]",
    description:
      "Starts a live countdown timer displayed as a React component in the terminal output. The timer shows the remaining time in HH:MM:SS format, a progress bar using block characters, and the percentage completed. When it reaches zero, a completion notification with 🔔 is shown. Multiple timers can run concurrently by running the command multiple times.",
    options: `
      <p><span class="text-tertiary-clr font-bold">25m          </span> - Minutes (m suffix).</p>
      <p><span class="text-tertiary-clr font-bold">1h           </span> - Hours (h suffix).</p>
      <p><span class="text-tertiary-clr font-bold">1h30m        </span> - Hours and minutes combined.</p>
      <p><span class="text-tertiary-clr font-bold">90s          </span> - Explicit seconds (s suffix).</p>
      <p><span class="text-tertiary-clr font-bold">3600         </span> - Bare integer = seconds.</p>
      <p><span class="text-tertiary-clr font-bold">[label]      </span> - Optional label shown alongside the timer (e.g. "Pomodoro").</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  timer 25m Pomodoro</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  timer 5m Short break</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  timer 1h30m Deep work</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  timer 30</p>`,
    notes:
      "Maximum duration is 24 hours. The timer is rendered as a 'component' block type — it holds a React ReactNode and is never serialized to localStorage. Refreshing the page will discard any running timers.",
    seeAlso: ["date", "time"],
  },

  todo: {
    name: "todo",
    synopsis: "todo [subcommand] [args]",
    description:
      "A persistent task list stored in localStorage under 'terminal:todos'. Tasks have a done/pending state toggled with 'done' and 'undone' subcommands. The list view shows all tasks grouped with a count of pending vs done. Short IDs are 6-character hex strings.",
    options: `
      <p><span class="text-tertiary-clr font-bold">todo                       </span> - List all tasks (pending first, done count noted).</p>
      <p><span class="text-tertiary-clr font-bold">todo add &lt;text&gt;            </span> - Add a task. Multi-word text is supported.</p>
      <p><span class="text-tertiary-clr font-bold">todo done &lt;id&gt;             </span> - Mark a task as completed (✓). Records completedAt timestamp.</p>
      <p><span class="text-tertiary-clr font-bold">todo undone &lt;id&gt;           </span> - Revert a completed task back to pending (○). Clears completedAt.</p>
      <p><span class="text-tertiary-clr font-bold">todo rm &lt;id&gt;               </span> - Delete a task permanently.</p>
      <p><span class="text-tertiary-clr font-bold">todo clear                 </span> - Delete all tasks (localStorage key removed).</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  todo add Review pull request for fyrre-magazine</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  todo</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  todo done a3f2bc</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  todo undone a3f2bc</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  todo rm a3f2bc</p>`,
    notes:
      "Tasks survive page refreshes. There is no edit subcommand — remove and re-add to update task text. The ○ and ✓ icons in list output are decorative ASCII, not interactive.",
    seeAlso: ["note", "snippet"],
  },

  uuid: {
    name: "uuid",
    synopsis: "uuid [v1|v4] [n]\nuuid validate <string>",
    description:
      "Generates and validates UUIDs. v4 (random) is the default — cryptographically secure via the uuid npm package. v1 (time-based) encodes the current timestamp and node identifier. Batch generation is supported up to 20 at a time.",
    options: `
      <p><span class="text-tertiary-clr font-bold">uuid              </span> - Generate one v4 UUID.</p>
      <p><span class="text-tertiary-clr font-bold">uuid &lt;n&gt;          </span> - Generate (n) v4 UUIDs (max 20).</p>
      <p><span class="text-tertiary-clr font-bold">uuid v1 [n]       </span> - Generate v1 (time-based) UUID(s).</p>
      <p><span class="text-tertiary-clr font-bold">uuid v4 [n]       </span> - Generate v4 (random) UUID(s).</p>
      <p><span class="text-tertiary-clr font-bold">uuid validate &lt;s&gt; </span> - Check if a string is a valid UUID (any version).</p>`,
    examples: `
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  uuid</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  uuid 5</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  uuid v1 3</p>
      <p class="text-tertiary-clr font-bold"><span aria-hidden="true" class="text-text-clr"> •</span>  uuid validate 550e8400-e29b-41d4-a716-446655440000</p>`,
    notes:
      "v4 UUIDs are preferred for most use cases (database IDs, session tokens, correlation IDs). v1 is useful when you need to decode the creation timestamp from the UUID later.",
    seeAlso: ["hash", "encode"],
  },
}
