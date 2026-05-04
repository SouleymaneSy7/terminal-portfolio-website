/**
 * Design Tokens - Centralized CSS constants
 *
 * Single source of truth for all decorative elements, icons, and separators
 * used across command outputs.
 */

export const DESIGN_TOKENS = {
  separators: {
    short: "────────────────────────────────────────", // 40 chars
    long: "──────────────────────────────────────────────────────", // 54 chars
  },

  decorators: {
    bullet: '<span aria-hidden="true" class="text-text-clr"> •</span>',
    quote: '<span aria-hidden="true">\'</span>',
    arrow: '<span aria-hidden="true"> → </span>',
  },

  icons: {
    warning: '<span aria-hidden="true" class="text-secondary-clr">⚠</span>',
    success: '<span aria-hidden="true" class="text-secondary-clr">✓</span>',
    error: '<span aria-hidden="true" class="text-secondary-clr">✗</span>',
    info: '<span aria-hidden="true" class="text-secondary-clr">ℹ</span>',
  },
} as const

export const DT = DESIGN_TOKENS
