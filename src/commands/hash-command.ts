/**
 * hash — generate cryptographic hashes via the Web Crypto API.
 *
 * Supported algorithms: sha256 (default), sha512, sha384, sha1
 * Input is UTF-8 encoded before hashing.
 *
 * @example
 * ```bash
 * hash Hello World
 * hash sha256 Hello World
 * hash sha512 my secret phrase
 * hash --help
 * ```
 */

import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { HASH_HELP } from "@/constants/help/utils"
import { createHtmlOutput, createErrorOutput } from "@/utils/output"

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const ALGORITHMS: Record<string, string> = {
  sha1: "SHA-1",
  sha256: "SHA-256",
  sha384: "SHA-384",
  sha512: "SHA-512",
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

async function digest(algorithm: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function formatBytes(n: number): string {
  return `${n} byte${n === 1 ? "" : "s"}`
}

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function buildHashOutput(algorithm: string, text: string, hashHex: string) {
  const byteLength = new TextEncoder().encode(text).length
  const grouped = hashHex.match(/.{1,8}/g)?.join(" ") ?? hashHex
  const displayText = text.length > 60 ? text.slice(0, 57) + "..." : text
  const bitSize = (hashHex.length / 2) * 8

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">${algorithm}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Input    </span>  <span class="text-text-clr">${displayText}</span></p>
        <p><span class="text-secondary-clr">Size     </span>  ${formatBytes(byteLength)}</p>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Hash</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p class="text-tertiary-clr font-bold whitespace-pre-wrap break-all">${grouped}</p>
        <p class="text-text-clr opacity-sep">${bitSize}-bit · ${hashHex.length} hex chars</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Try: <span class="text-tertiary-clr font-bold">hash sha512 ${text.split(" ")[0]}</span> for a longer hash.</p>
      </div>
    </div>`,
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleHashCommand = async (args: string[]) => {
  const parsed = parseArgs(args)

  if (parsed.flags.help) return HASH_HELP

  if (parsed.positional.length === 0) {
    return createErrorOutput(
      "No text provided.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">hash [algorithm] &lt;text&gt;</span>`,
    )
  }

  // Detect if first positional is an algorithm name
  const firstLower = parsed.positional[0].toLowerCase()
  let algoKey = "sha256"
  let textParts = parsed.positional

  if (firstLower in ALGORITHMS) {
    algoKey = firstLower
    textParts = parsed.positional.slice(1)
  }

  if (textParts.length === 0) {
    return createErrorOutput(
      `No text provided after algorithm.`,
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">hash ${algoKey} &lt;text&gt;</span>`,
    )
  }

  const text = textParts.join(" ")
  const algorithm = ALGORITHMS[algoKey]

  try {
    const hashHex = await digest(algorithm, text)
    return buildHashOutput(algorithm, text, hashHex)
  } catch {
    return createErrorOutput("Failed to compute hash. Web Crypto API unavailable.")
  }
}
