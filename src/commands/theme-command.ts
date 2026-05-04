/**
 * Theme & Typeface Commands
 *
 * Handles: theme, typeface
 * Exports: THEMES, FONTS, apply/init helpers, and main handlers.
 *
 * @example
 * ```bash
 * theme
 * theme dracula
 * typeface fira
 * typeface --help
 * ```
 */

import { parseArgs } from "@/utils/argParser"
import { DESIGN_TOKENS as DT } from "@/utils/designTokens"
import { THEME_HELP, TYPEFACE_HELP } from "@/constants/help/system"
import { createHtmlOutput, createErrorOutput } from "@/utils/output"
import { STORAGE_KEYS } from "@/constants/storageKeys"

// ─────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────

export const THEMES = {
  // ── Catppuccin family ──────────────────────
  catppuccin: {
    label: "Catppuccin Macchiato",
    description: "Soft, soothing pastels perfect for long coding sessions",
  },
  "catppuccin-latte": {
    label: "Catppuccin Latte",
    description: "Warm and bright tones, like a sunny morning coffee",
  },
  "catppuccin-frappe": {
    label: "Catppuccin Frappé",
    description: "Subtle contrast with medium depth, very comfortable",
  },
  "catppuccin-mocha": {
    label: "Catppuccin Mocha",
    description: "The richest and darkest of the family, deep and elegant",
  },

  // ── Popular dark themes ────────────────────
  monokai: {
    label: "Monokai",
    description: "The timeless classic loved by generations of developers",
  },
  "tokyo-night": {
    label: "Tokyo Night",
    description: "Neon nights of Tokyo, perfect for late-night coding",
  },
  dracula: {
    label: "Dracula",
    description: "Rich, mysterious, and slightly gothic",
  },
  nord: {
    label: "Nord",
    description: "Icy blues and Nordic minimalism, clean and calming",
  },
  gruvbox: {
    label: "Gruvbox Dark",
    description: "Warm retro tones with organic colors and great comfort",
  },
  everforest: {
    label: "Everforest Dark",
    description: "Deep forest atmosphere with soothing green tones",
  },
  "rose-pine": {
    label: "Rosé Pine",
    description: "Romantic and dreamy, soft pinks and warm woods",
  },

  // ── Editor classics ────────────────────────
  "solarized-dark": {
    label: "Solarized Dark",
    description: "Scientifically precise colors with legendary harmony",
  },
  oceanic: {
    label: "Oceanic Next",
    description: "Deep ocean blues with vibrant and modern accents",
  },
  cobalt2: {
    label: "Cobalt2",
    description: "Striking cobalt blue, powerful contrast and high energy",
  },
  github: {
    label: "GitHub Dark",
    description: "The familiar dark theme you already know and trust",
  },
  "one-dark": {
    label: "One Dark",
    description: "The iconic Atom/VS Code theme, refined for terminals",
  },
  "atom-one-dark": {
    label: "Atom One Dark",
    description: "Signature purple and cyan accents with bold elegance",
  },

  // ── Material family ───────────────────────
  "material-default": {
    label: "Material Default",
    description: "The original — teal green on deep blue-grey",
  },
  "material-lighter": {
    label: "Material Lighter",
    description: "Light and airy — the Material light variant",
  },
  "material-oceanic": {
    label: "Material Oceanic",
    description: "Ocean-blue accent, same classic Material base",
  },
  "material-palenight": {
    label: "Material Palenight",
    description: "Deep purple background with vivid neon accents",
  },
  "material-deep-ocean": {
    label: "Material Deep Ocean",
    description: "Near-black depths with electric blue and violet",
  },
  "material-high-contrast": {
    label: "Material High Contrast",
    description: "Pure black, maximum contrast — nothing distracts",
  },

  // ── Others ───────────────────────────────
  "ayu-dark": {
    label: "Ayu Dark",
    description: "Dark background, warm amber and orange — minimal and sharp",
  },
  "night-owl": {
    label: "Night Owl",
    description: "Designed for low-light — cyan primary, yellow highlights",
  },
  synthwave: {
    label: "Synthwave '84",
    description: "Neon pink and cyan on deep purple — pure retro-futurism",
  },
  kanagawa: {
    label: "Kanagawa",
    description: "Inspired by the Great Wave — samurai red, ocean blue",
  },
  horizon: {
    label: "Horizon",
    description: "Warm coral and pink on dark indigo — sunset aesthetic",
  },
  poimandres: {
    label: "Poimandres",
    description: "Teal and purple on near-black — calm, focused, modern",
  },
  vesper: {
    label: "Vesper",
    description: "Pure black background, amber gold — minimal and elegant",
  },
  "hack-the-box": {
    label: "Hack The Box",
    description: "Matrix green on deep navy — for the hacker in you",
  },
} as const

export const FONTS = {
  // ── Default (loaded statically by Next.js) ──
  cascadia: {
    label: "Cascadia Code",
    description: "Clean, modern, and incredibly polished — Microsoft's gift to developers",
    variable: "--font-cascadia-code",
  },

  // ── Google Fonts (loaded dynamically) ──
  fira: {
    label: "Fira Code",
    description: "Code that breathes — famous for its stunning ligatures",
    variable: "--font-fira-code",
  },
  jetbrains: {
    label: "JetBrains Mono",
    description: "Clean and crisp — designed for maximum readability",
    variable: "--font-jetbrains-mono",
  },
  "ibm-plex": {
    label: "IBM Plex Mono",
    description: "Corporate elegance — IBM's modern monospace masterpiece",
    variable: "--font-ibm-plex-mono",
  },
  "source-code": {
    label: "Source Code Pro",
    description: "Adobe's gift to developers — refined and professional",
    variable: "--font-source-code-pro",
  },
  ubuntu: {
    label: "Ubuntu Mono",
    description: "Friendly and open — the Linux spirit in a font",
    variable: "--font-ubuntu-mono",
  },
  space: {
    label: "Space Mono",
    description: "Retro-futuristic — perfect for that vintage terminal feel",
    variable: "--font-space-mono",
  },
  inconsolata: {
    label: "Inconsolata",
    description: "Compact and efficient — a classic programmer's choice",
    variable: "--font-inconsolata",
  },
  cousine: {
    label: "Cousine",
    description: "Metrics-compatible with Courier New — familiar yet fresh",
    variable: "--font-cousine-mono",
  },

  // ── Local Fonts (loaded dynamically from /public/fonts/) ──
  geist: {
    label: "Geist Mono",
    description: "Sharp, elegant, and minimal — designed for the modern developer",
    variable: "--font-geist-mono",
  },
  "recursive-casual": {
    label: "Recursive Casual Mono",
    description: "Artistic and expressive, like handwriting meets monospace",
    variable: "--font-recursive-casual",
  },
  "recursive-linear": {
    label: "Recursive Linear Mono",
    description: "Geometric and precise — Recursive's serious side",
    variable: "--font-recursive-linear",
  },
  hack: {
    label: "Hack",
    description: "Designed for source code — clear, readable, and battle-tested",
    variable: "--font-hack",
  },
  victor: {
    label: "Victor Mono",
    description: "Cursive italics and personality — code with character",
    variable: "--font-victor-mono",
  },
  meslo: {
    label: "Meslo LG",
    description: "Menlo's cousin — customized for better line spacing",
    variable: "--font-meslo",
  },
} as const

export type ThemeKey = keyof typeof THEMES
export type FontKey = keyof typeof FONTS

export const THEME_STORAGE_KEY = STORAGE_KEYS.THEME
export const FONT_STORAGE_KEY = STORAGE_KEYS.FONT
// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

export const getCurrentTheme = (): ThemeKey => {
  if (typeof document === "undefined") return "catppuccin"
  return (document.documentElement.getAttribute("data-theme") as ThemeKey) || "catppuccin"
}

export const getCurrentFont = (): FontKey => {
  if (typeof document === "undefined") return "cascadia"
  return (document.documentElement.getAttribute("data-font") as FontKey) || "cascadia"
}

export const getThemeLabel = (key: ThemeKey): string => THEMES[key]?.label ?? key

export const getFontLabel = (key: FontKey): string => FONTS[key]?.label ?? key

export const applyTheme = (theme: ThemeKey): void => {
  document.documentElement.setAttribute("data-theme", theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (err) {
    console.error("[Theme - apply] failed to set:", err)
  }
}

export const applyFont = async (font: FontKey): Promise<void> => {
  // Load the font dynamically if needed (Google Fonts or local fonts)
  const { loadDynamicFont } = await import("@/hooks/useDynamicFont")
  await loadDynamicFont(font)

  // Apply the font via data-font attribute
  document.documentElement.setAttribute("data-font", font)
  try {
    localStorage.setItem(FONT_STORAGE_KEY, font)
  } catch (err) {
    console.error("[Font - apply] failed to set:", err)
  }
}

export const initThemeAndFont = async (): Promise<void> => {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeKey | null
    const savedFont = localStorage.getItem(FONT_STORAGE_KEY) as FontKey | null

    if (savedTheme && savedTheme in THEMES) {
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
    if (savedFont && savedFont in FONTS) {
      // Load the saved font dynamically before applying
      const { loadDynamicFont } = await import("@/hooks/useDynamicFont")
      await loadDynamicFont(savedFont)
      document.documentElement.setAttribute("data-font", savedFont)
    }
  } catch (error) {
    console.error("[initThemeAndFont]", error)
  }
}

// ─────────────────────────────────────────────────────────────────
// THEME OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

const THEME_GROUPS: { label: string; keys: ThemeKey[] }[] = [
  {
    label: "Catppuccin",
    keys: ["catppuccin", "catppuccin-latte", "catppuccin-frappe", "catppuccin-mocha"],
  },
  {
    label: "Popular Dark",
    keys: ["monokai", "tokyo-night", "dracula", "nord", "gruvbox", "everforest", "rose-pine"],
  },
  {
    label: "Editor Classics",
    keys: ["solarized-dark", "oceanic", "cobalt2", "github", "one-dark", "atom-one-dark"],
  },
  {
    label: "Material",
    keys: [
      "material-default",
      "material-lighter",
      "material-oceanic",
      "material-palenight",
      "material-deep-ocean",
      "material-high-contrast",
    ],
  },
  {
    label: "Others",
    keys: [
      "ayu-dark",
      "night-owl",
      "synthwave",
      "kanagawa",
      "horizon",
      "poimandres",
      "vesper",
      "hack-the-box",
    ],
  },
]

export const getThemeListOutput = () => {
  const current = getCurrentTheme()

  const renderGroup = ({ label, keys }: { label: string; keys: ThemeKey[] }) => {
    const rows = keys
      .map((key) => {
        const theme = THEMES[key]
        const isActive = key === current
        const nameClass = isActive ? "text-primary-clr font-bold" : "text-tertiary-clr"
        const activeTag = isActive
          ? ` <span class="text-primary-clr font-bold"> ← active</span>`
          : ""
        return `<p>
          <span class="${nameClass}">${theme.label.padEnd(28)}</span>
          <span class="text-text-clr">- ${theme.description}.</span>${activeTag}
        </p>`
      })
      .join("")

    return `<div class="space-y-t-group">
      <p class="text-secondary-clr font-bold">${label}</p>
      <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      ${rows}
    </div>`
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      ${THEME_GROUPS.map(renderGroup).join("\n")}
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">theme &lt;name&gt;</span>${DT.decorators.quote} to switch.</p>
      </div>
    </div>`,
  )
}

export const getThemeSwitchOutput = (theme: ThemeKey) => {
  applyTheme(theme)
  const { label, description } = THEMES[theme]

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Theme switched${DT.decorators.arrow}${label}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${description}.</p>
        <p><span class="text-primary-clr font-bold">${DT.icons.success} Preference saved.</span> All text updated instantly.</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">theme</span>${DT.decorators.quote} to see all themes.</p>
      </div>
    </div>`,
  )
}

export const getThemeInvalidOutput = (name: string) =>
  createErrorOutput(
    `Unknown theme: <span class="text-tertiary-clr">"${name}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">theme</span>${DT.decorators.quote} to see all available themes.`,
  )

// ─────────────────────────────────────────────────────────────────
// FONT OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

export const getFontListOutput = () => {
  const current = getCurrentFont()

  const rows = (Object.entries(FONTS) as [FontKey, (typeof FONTS)[FontKey]][])
    .map(([key, font]) => {
      const isActive = key === current
      const nameClass = isActive ? "text-primary-clr font-bold" : "text-tertiary-clr"
      const activeTag = isActive ? `<span class="text-primary-clr font-bold"> ← active</span>` : ""
      return `<p>
        <span class="${nameClass}">${font.label.padEnd(24)}</span>
        <span class="text-text-clr">- ${font.description}.</span>${activeTag}
      </p>`
    })
    .join("")

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Available Fonts</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">typeface &lt;name&gt;</span>${DT.decorators.quote} to switch.</p>
      </div>
    </div>`,
  )
}

export const getFontSwitchOutput = async (font: FontKey) => {
  try {
    await applyFont(font)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return createErrorOutput(
      `Failed to load font: <span class="text-tertiary-clr">${FONTS[font].label}</span>`,
      `${msg} — try another font or check your connection.`,
    )
  }
  const { label, description } = FONTS[font]

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">${DT.icons.success} Font switched${DT.decorators.arrow}${label}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${description}.</p>
        <p><span class="text-primary-clr font-bold">${DT.icons.success} Preference saved.</span> All text updated instantly.</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">typeface</span>${DT.decorators.quote} to see all fonts.</p>
      </div>
    </div>`,
  )
}

export const getFontInvalidOutput = (name: string) =>
  createErrorOutput(
    `Unknown font: <span class="text-tertiary-clr">"${name}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">typeface</span>${DT.decorators.quote} to see all available fonts.`,
  )

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLERS
// ─────────────────────────────────────────────────────────────────

export const handleThemeCommand = (args: string[]) => {
  const parsed = parseArgs(args)

  if (parsed.flags.help) return THEME_HELP

  const themeName = parsed.positional.join(" ").trim().toLowerCase()
  if (!themeName) return getThemeListOutput()
  if (themeName in THEMES) return getThemeSwitchOutput(themeName as ThemeKey)
  return getThemeInvalidOutput(themeName)
}

export const handleTypefaceCommand = async (args: string[]) => {
  const parsed = parseArgs(args)

  if (parsed.flags.help) return TYPEFACE_HELP

  const fontName = parsed.positional.join(" ").trim().toLowerCase()
  if (!fontName) return getFontListOutput()
  if (fontName in FONTS) return await getFontSwitchOutput(fontName as FontKey)
  return getFontInvalidOutput(fontName)
}
