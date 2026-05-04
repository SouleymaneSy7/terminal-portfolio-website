/**
 * ip — display public IP address and geolocation info.
 *
 * Delegates all HTTP logic to ip.service.ts
 *
 * Note: the IP shown is your public IP as seen by the server.
 * If you're behind a VPN or proxy, that IP will be shown instead.
 */

import axios from "axios"

import { fetchIpInfo } from "@/services"
import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { createErrorOutput, createHtmlOutput } from "@/utils/output"
import { IP_HELP } from "@/constants/help/utils"

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

/**
 * Derive a flag emoji from a 2-letter ISO 3166-1 alpha-2 country code.
 * Uses Unicode Regional Indicator letters (U+1F1E6–U+1F1FF).
 */
function countryFlag(code: string | null | undefined): string {
  if (!code || code.length !== 2) return ""
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) - 65 + 0x1f1e6))
    .join("")
}

/**
 * Format an ipapi.co utc_offset string (e.g. "-0700", "+0530")
 * into a human-readable "UTC ±HH:MM" string.
 */
function formatUtcOffset(offset: string | null | undefined): string {
  if (!offset || offset.length < 5) return "—"
  const sign = offset[0]
  const hh = offset.slice(1, 3)
  const mm = offset.slice(3, 5)
  return `UTC ${sign}${hh}:${mm}`
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleIpCommand = async (args: string[]) => {
  const { flags } = parseArgs(args)

  if (flags.help) return IP_HELP

  try {
    const data = await fetchIpInfo()

    const flag = countryFlag(data.country_code)
    const coords =
      data.latitude != null && data.longitude != null
        ? `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`
        : "—"
    const utc = formatUtcOffset(data.utc_offset)

    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Public IP</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p class="text-tertiary-clr font-bold" style="font-size: var(--text-fs-subtitle)">${data.ip}</p>
          <p class="text-text-clr opacity-sep">${data.version ?? "IPv4"}</p>
        </div>
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Location</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-secondary-clr">Country   </span>${DT.decorators.arrow}${flag} ${data.country_name ?? "—"} (${data.country_code ?? "—"})</p>
          <p><span class="text-secondary-clr">Region    </span>${DT.decorators.arrow}${data.region ?? "—"}</p>
          <p><span class="text-secondary-clr">City      </span>${DT.decorators.arrow}${data.city ?? "—"}</p>
          <p><span class="text-secondary-clr">Postal    </span>${DT.decorators.arrow}${data.postal ?? "—"}</p>
          <p><span class="text-secondary-clr">Coords    </span>${DT.decorators.arrow}${coords}</p>
        </div>
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Network</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p><span class="text-secondary-clr">Org       </span>${DT.decorators.arrow}${data.org ?? "—"}</p>
          <p><span class="text-secondary-clr">ASN       </span>${DT.decorators.arrow}${data.asn ?? "—"}</p>
          <p><span class="text-secondary-clr">Timezone  </span>${DT.decorators.arrow}${data.timezone ?? "—"} (${utc})</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p class="text-text-clr opacity-sep">Data via ipapi.co — free geolocation API.</p>
        </div>
      </div>`,
    )
  } catch (err) {
    let msg = "Could not fetch IP information. Try again later."

    if (axios.isAxiosError(err)) {
      if (err.code === "ECONNABORTED") {
        msg = "Request timed out. Check your connection."
      } else if (err.response?.status === 429) {
        msg = "Rate limit reached. Please wait a moment and try again."
      }
    } else if (err instanceof Error) {
      msg = err.message
    }

    return createErrorOutput(msg)
  }
}
