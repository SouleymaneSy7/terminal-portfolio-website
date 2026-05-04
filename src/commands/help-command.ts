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

import { commands } from "@/constants"
import type { CommandHistoryOutputType } from "@/types"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { createHtmlOutput } from "@/utils/output"

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleHelpCommand = (): CommandHistoryOutputType => {
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Available Commands <span class="text-text-clr opacity-sep">(${commands.length} total)</span></p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>
            <span class="text-secondary-clr font-bold">Tip:</span> Every command accepts
            <span class="text-tertiary-clr font-bold">help</span>,
            <span class="text-tertiary-clr font-bold">--help</span> or
            <span class="text-tertiary-clr font-bold">-h</span>
            for detailed usage — e.g.
            <span class="text-tertiary-clr font-bold">weather --help</span>
          </p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Navigation &amp; System</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">audio     </span> - Toggle keyboard sound effects and control volume. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">audio [on|off|volume &lt;n&gt;]</span></p>
          <p><span class="text-tertiary-clr font-bold">clear     </span> - Clear the terminal screen</p>
          <p><span class="text-tertiary-clr font-bold">exit      </span> - Display goodbye message <span class="text-text-clr opacity-sep">(close tab to exit)</span></p>
          <p><span class="text-tertiary-clr font-bold">help      </span> - List all available commands</p>
          <p><span class="text-tertiary-clr font-bold">hostname  </span> - Display system hostname and portfolio info</p>
          <p><span class="text-tertiary-clr font-bold">neofetch  </span> - Linux-style system summary with live theme &amp; font</p>
          <p><span class="text-tertiary-clr font-bold">theme     </span> - Switch color theme (31 themes). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">theme [name]</span></p>
          <p><span class="text-tertiary-clr font-bold">typeface  </span> - Switch terminal font (15 fonts). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">typeface [name]</span></p>
          <p><span class="text-tertiary-clr font-bold">welcome   </span> - Display the welcome banner again</p>
          <p><span class="text-tertiary-clr font-bold">whoami    </span> - Who is behind this terminal?</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Information</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">about     </span> - My story, journey and tech stack</p>
          <p><span class="text-tertiary-clr font-bold">contact   </span> - All social networks and contact details</p>
          <p><span class="text-tertiary-clr font-bold">date      </span> - Live clock with date, time and timezone</p>
          <p><span class="text-tertiary-clr font-bold">time      </span> - Alias for date — same live clock</p>
          <p><span class="text-tertiary-clr font-bold">email     </span> - Display my email address with mailto link</p>
          <p><span class="text-tertiary-clr font-bold">projects  </span> - Browse my most notable projects</p>
          <p><span class="text-tertiary-clr font-bold">repo      </span> - This portfolio's source code on GitHub</p>
          <p><span class="text-tertiary-clr font-bold">resume    </span> - View or download my CV in French or English (PDF)</p>
          <p><span class="text-tertiary-clr font-bold">weather   </span> - Real-time weather for any city via wttr.in. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">weather &lt;city&gt;</span></p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Network</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">curl      </span> - Browser HTTP client with full flag parser. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">curl [options] &lt;url&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">github    </span> - Display GitHub user profile, stats, and top repos. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">github &lt;username&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">ip        </span> - Display public IP address and geolocation info</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Utilities</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">age       </span> - Calculate exact age from birthdate with next-birthday countdown. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">age &lt;date&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">calc      </span> - Mathematical calculator with algebra, trigonometry, units (mathjs). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">calc &lt;expression&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">color     </span> - Convert colors between hex, rgb, hsl, and oklch formats. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">color &lt;value&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">convert   </span> - Real-time currency conversion (168+ currencies via ECB). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">convert &lt;amount&gt; &lt;from&gt; &lt;to&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">decode    </span> - Decode text from base64, url or hex. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">decode &lt;format&gt; &lt;text&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">echo      </span> - Output text to terminal with support for \\n newlines. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">echo &lt;text&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">encode    </span> - Encode text using base64, url or hex. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">encode &lt;format&gt; &lt;text&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">hash      </span> - Generate cryptographic hashes (sha256, sha512, sha384, sha1). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">hash &lt;algorithm&gt; &lt;text&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">history   </span> - Display recent command history (default 20, max 50). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">history [n]</span></p>
          <p><span class="text-tertiary-clr font-bold">man       </span> - Display manual page for any command. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">man &lt;command&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">note      </span> - Persistent note manager (add/rm/edit/clear). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">note [subcommand]</span></p>
          <p><span class="text-tertiary-clr font-bold">snippet   </span> - Store &amp; retrieve code snippets (add/show/rm/clear). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">snippet [subcommand]</span></p>
          <p><span class="text-tertiary-clr font-bold">timer     </span> - Start a countdown timer (formats: 25m, 1h, 1h30m, 90s). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">timer &lt;duration&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">todo      </span> - Task list with done/undone states (add/done/undone/rm/clear). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">todo [subcommand]</span></p>
          <p><span class="text-tertiary-clr font-bold">uuid      </span> - Generate &amp; validate UUIDs (v1 time-based, v4 random). <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">uuid [v1|v4] [count]</span></p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Fun &amp; Games</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">cowsay    </span> - Make a cow say your message in ASCII. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">cowsay &lt;message&gt;</span></p>
          <p><span class="text-tertiary-clr font-bold">game      </span> - Start the Frontend Quiz — 40 questions, XP system, ranks</p>
          <p><span class="text-tertiary-clr font-bold">joke      </span> - Random programming joke (JokeAPI)</p>
          <p><span class="text-tertiary-clr font-bold">quote     </span> - Random advice quote (Advice Slip API)</p>
          <p><span class="text-tertiary-clr font-bold">rps       </span> - Play rock-paper-scissors against the terminal. <span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">rps [rock|paper|scissors]</span></p>
          <p><span class="text-tertiary-clr font-bold">sudo      </span> - Attempt to gain root access... 😄</p>
        </div>

        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Keyboard Shortcuts</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-tertiary-clr font-bold">[Tab]      </span> - Autocomplete command or argument (cycles through matches)</p>
          <p><span class="text-tertiary-clr font-bold">[↑] [↓]    </span> - Navigate command history (or suggestions when panel is open)</p>
          <p><span class="text-tertiary-clr font-bold">[Esc]      </span> - Dismiss suggestions panel, keep focus</p>
          <p><span class="text-tertiary-clr font-bold">[Enter]    </span> - Execute command</p>
          <p><span class="text-tertiary-clr font-bold">[Ctrl + L] </span> - Clear the terminal screen</p>
          <p><span class="text-tertiary-clr font-bold">[Ctrl + R] </span> - Enter reverse search mode — cycle through history matches</p>
          <p><span class="text-tertiary-clr font-bold">[Ctrl + C] </span> - Cancel a running command (only active while loading)</p>
        </div>

        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Type any command to get started — or try <span class="text-tertiary-clr font-bold">neofetch</span> for the full system overview.</p>
          <p>For detailed command usage, append <span class="text-tertiary-clr font-bold">--help</span> to any command.</p>
        </div>

      </div>`,
  )
}
