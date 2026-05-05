/**
 * Grouped suggestion data for the terminal suggestions panel.
 * They live here so CommandInput can import them as stable references.
 */

import type { SuggestionGroupType } from "@/types"

// ─────────────────────────────────────────────────────────────────
// THEME GROUPS  (mirrors the grouping in theme-command.ts output)
// ─────────────────────────────────────────────────────────────────

export const THEME_GROUPS: readonly SuggestionGroupType[] = [
  {
    label: "Catppuccin",
    items: ["catppuccin", "catppuccin-latte", "catppuccin-frappe", "catppuccin-mocha"],
  },
  {
    label: "Popular Dark",
    items: ["monokai", "tokyo-night", "dracula", "nord", "gruvbox", "everforest", "rose-pine"],
  },
  {
    label: "Editor Classics",
    items: ["solarized-dark", "oceanic", "cobalt2", "github", "one-dark", "atom-one-dark"],
  },
  {
    label: "Material",
    items: [
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
    items: [
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
] as const

// ─────────────────────────────────────────────────────────────────
// FONT GROUPS
// ─────────────────────────────────────────────────────────────────

export const FONT_GROUPS: readonly SuggestionGroupType[] = [
  {
    label: "Signature",
    items: ["recursive-casual"],
  },
  {
    label: "Popular",
    items: [
      "fira",
      "jetbrains",
      "ibm-plex",
      "source-code",
      "ubuntu",
      "space",
      "inconsolata",
      "cousine",
    ],
  },
  {
    label: "Modern",
    items: ["geist"],
  },
  {
    label: "Handcrafted",
    items: ["recursive-casual", "recursive-linear", "hack", "victor", "meslo"],
  },
] as const
