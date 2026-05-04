import { AUDIO_HELP } from "@/constants/help/system"
import { audioService } from "@/services/audio.service"
import { STORAGE_KEYS } from "@/constants/storageKeys"
import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { createErrorOutput, createHtmlOutput } from "@/utils/output"

function persist() {
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIO, JSON.stringify(audioService.getState()))
  } catch {}
}

function buildStatusOutput() {
  const { enabled, volume } = audioService.getState()
  const statusClass = enabled ? "text-tertiary-clr" : "text-secondary-clr"
  const statusLabel = enabled ? "ON" : "OFF"

  // Barre de volume ASCII
  const filled = Math.round((volume / 100) * 20)
  const bar = "█".repeat(filled) + "░".repeat(20 - filled)

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Audio</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-secondary-clr">Status </span>${DT.decorators.arrow}
          <span class="${statusClass} font-bold">${statusLabel}</span>
        </p>
        <p>
          <span class="text-secondary-clr">Volume </span>${DT.decorators.arrow}
          <span class="text-tertiary-clr">${bar}</span>
          <span class="text-text-clr opacity-sep"> ${volume}%</span>
        </p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">audio --help</span>${DT.decorators.quote} for all options.
        </p>
      </div>
    </div>`,
  )
}

export const handleAudioCommand = (args: string[]) => {
  const { flags, subcommand, positional } = parseArgs(args)

  if (flags.help) return AUDIO_HELP

  const sub = subcommand?.toLowerCase()

  // audio (sans args) → status
  if (!sub) return buildStatusOutput()

  // audio on
  if (sub === "on") {
    audioService.setEnabled(true)
    persist()
    // Jouer un son de confirmation immédiatement
    audioService.play("success")
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-tertiary-clr font-bold">${DT.icons.success} Audio enabled</p>
          <p>Keyboard sounds are now <span class="text-tertiary-clr font-bold">active</span>.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Use <span class="text-tertiary-clr font-bold">audio volume &lt;0-100&gt;</span> to adjust.</p>
        </div>
      </div>`,
    )
  }

  // audio off
  if (sub === "off") {
    audioService.setEnabled(false)
    persist()
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">${DT.icons.success} Audio disabled</p>
          <p>Keyboard sounds are now <span class="text-secondary-clr font-bold">silent</span>.</p>
        </div>
      </div>`,
    )
  }

  // audio volume <n>
  if (sub === "volume") {
    const raw = positional[1]
    if (!raw) {
      return createErrorOutput(
        "Missing volume value.",
        `Usage: <span class="text-tertiary-clr font-bold">audio volume &lt;0-100&gt;</span>`,
      )
    }
    const n = parseInt(raw, 10)
    if (isNaN(n) || n < 0 || n > 100) {
      return createErrorOutput(
        `Invalid volume: <span class="text-tertiary-clr">"${raw}"</span>`,
        `Enter a number between <span class="text-tertiary-clr">0</span> and <span class="text-tertiary-clr">100</span>.`,
      )
    }
    audioService.setVolume(n)
    persist()
    audioService.play("keypress") // feedback immédiat
    return buildStatusOutput()
  }

  return createErrorOutput(
    `Unknown subcommand: <span class="text-tertiary-clr">"${sub}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">audio --help</span>${DT.decorators.quote} for all options.`,
  )
}
