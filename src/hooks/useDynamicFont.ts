"use client"

import type { FontKey } from "@/commands/theme-command"
import { FontSourceType, GoogleFontSourceType, LocalFontSourceType } from "@/types"
import * as React from "react"

// ─────────────────────────────────────────────────────────────────
// FONT REGISTRY
// ─────────────────────────────────────────────────────────────────
// Recursive Casual Mono is NOT in this registry — it is loaded statically
// by Next.js localFont() in layout.tsx and is always available.
// Every other font loads on demand when the user first requests it.

export const FONT_SOURCES: Partial<Record<FontKey, FontSourceType>> = {
  // ── Google Fonts ─────────────────────────────────────────────
  fira: {
    type: "google",
    googleFamily: "Fira+Code",
    cssName: "Fira Code",
    cssVariable: "--font-fira-code",
    weights: "400;700",
  },
  jetbrains: {
    type: "google",
    googleFamily: "JetBrains+Mono",
    cssName: "JetBrains Mono",
    cssVariable: "--font-jetbrains-mono",
    weights: "400;700",
  },
  "ibm-plex": {
    type: "google",
    googleFamily: "IBM+Plex+Mono",
    cssName: "IBM Plex Mono",
    cssVariable: "--font-ibm-plex-mono",
    weights: "400;700",
  },
  "source-code": {
    type: "google",
    googleFamily: "Source+Code+Pro",
    cssName: "Source Code Pro",
    cssVariable: "--font-source-code-pro",
    weights: "400;700",
  },
  ubuntu: {
    type: "google",
    googleFamily: "Ubuntu+Mono",
    cssName: "Ubuntu Mono",
    cssVariable: "--font-ubuntu-mono",
    weights: "400;700",
  },
  space: {
    type: "google",
    googleFamily: "Space+Mono",
    cssName: "Space Mono",
    cssVariable: "--font-space-mono",
    weights: "400;700",
  },
  inconsolata: {
    type: "google",
    googleFamily: "Inconsolata",
    cssName: "Inconsolata",
    cssVariable: "--font-inconsolata",
    weights: "400;700",
  },
  cousine: {
    type: "google",
    googleFamily: "Cousine",
    cssName: "Cousine",
    cssVariable: "--font-cousine-mono",
    weights: "400;700",
  },

  // ── Local fonts (served from /public/fonts/) ──
  cascadia: {
    type: "local",
    cssName: "Cascadia Code",
    cssVariable: "--font-cascadia-code",
    files: [
      { weight: 400, path: "/fonts/cascadia-code-regular.woff2" },
      { weight: 700, path: "/fonts/cascadia-code-bold.woff2" },
    ],
  },
  "recursive-casual": {
    type: "local",
    cssName: "Recursive",
    cssVariable: "--font-recursive-casual",
    files: [
      { weight: 400, path: "/fonts/recursive-mono-casual-regular.woff2" },
      { weight: 700, path: "/fonts/recursive-mono-casual-bold.woff2" },
    ],
  },
  "recursive-linear": {
    type: "local",
    cssName: "Recursive",
    cssVariable: "--font-recursive-linear",
    files: [
      { weight: 400, path: "/fonts/recursive-mono-linear-regular.woff2" },
      { weight: 700, path: "/fonts/recursive-mono-linear-bold.woff2" },
    ],
  },
  hack: {
    type: "local",
    cssName: "Hack",
    cssVariable: "--font-hack",
    files: [
      { weight: 400, path: "/fonts/hack-regular.woff2" },
      { weight: 700, path: "/fonts/hack-bold.woff2" },
    ],
  },
  victor: {
    type: "local",
    cssName: "Victor Mono",
    cssVariable: "--font-victor-mono",
    files: [
      { weight: 400, path: "/fonts/victor-mono-regular.woff2" },
      { weight: 700, path: "/fonts/victor-mono-bold.woff2" },
    ],
  },
  meslo: {
    type: "local",
    cssName: "Meslo LG",
    cssVariable: "--font-meslo",
    files: [
      { weight: 400, path: "/fonts/meslo-regular.woff2" },
      { weight: 700, path: "/fonts/meslo-bold.woff2" },
    ],
  },
}

const loaded = new Set<FontKey>()
const pending = new Map<FontKey, Promise<void>>()

// ─────────────────────────────────────────────────────────────────
// CORE LOADER  (framework-agnostic, callable outside React)
// ─────────────────────────────────────────────────────────────────

/**
 * Loads a font on demand and registers its CSS custom property on :root.
 *
 * For Google Fonts: injects a <link> stylesheet (browser caches it).
 * For local fonts:  uses FontFace API to load from /public/fonts/.
 * For Geist Mono:   uses the npm package 'geist' (already bundled).
 *
 * After loading, sets  --font-xxx: "Family Name", monospace  on :root
 * so the existing CSS rule  html[data-font="xxx"] body { font-family: var(--font-xxx) }
 * resolves correctly without any changes to globals.css.
 *
 * Recursive Casual Mono (the default) is NOT handled here — it is always
 * available via Next.js localFont() before any JS runs.
 */

export async function loadDynamicFont(key: FontKey): Promise<void> {
  // Default font is always loaded by Next.js.
  if (key === "recursive-casual") return

  // Geist Mono is loaded via npm package, just register the CSS variable
  if (key === "geist") {
    if (!loaded.has(key)) {
      const { GeistMono } = await import("geist/font/mono")
      document.documentElement.style.setProperty("--font-geist-mono", GeistMono.style.fontFamily)
      loaded.add(key)
    }
    return
  }

  if (loaded.has(key)) return

  if (pending.has(key)) {
    return pending.get(key)!
  }

  const source = FONT_SOURCES[key]
  if (!source) {
    console.warn(`[useDynamicFont] No source registered for font key: "${key}"`)
    return
  }

  const promise = (async () => {
    if (source.type === "google") {
      await loadGoogleFont(source)
    } else {
      await loadLocalFont(source)
    }

    // Register the CSS custom property so the CSS rule resolves.
    document.documentElement.style.setProperty(source.cssVariable, `"${source.cssName}", monospace`)

    loaded.add(key)
  })()

  pending.set(key, promise)

  try {
    await promise
  } finally {
    pending.delete(key)
  }
}

// ─────────────────────────────────────────────────────────────────
// GOOGLE FONTS LOADER
// ─────────────────────────────────────────────────────────────────

function loadGoogleFont(source: GoogleFontSourceType): Promise<void> {
  return new Promise((resolve, reject) => {
    const url = `https://fonts.googleapis.com/css2?family=${source.googleFamily}:wght@${source.weights}&display=swap`

    // Avoid injecting the same stylesheet twice.
    if (document.querySelector(`link[href="${url}"]`)) {
      resolve()
      return
    }

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = url
    link.onload = () => resolve()
    link.onerror = () =>
      reject(new Error(`[useDynamicFont] Failed to load Google Font: ${source.googleFamily}`))
    document.head.appendChild(link)
  })
}

// ─────────────────────────────────────────────────────────────────
// LOCAL FONT LOADER  (FontFace API)
// ─────────────────────────────────────────────────────────────────

async function loadLocalFont(source: LocalFontSourceType): Promise<void> {
  await Promise.all(
    source.files.map(async ({ weight, path }) => {
      try {
        const face = new FontFace(source.cssName, `url(${path})`, {
          weight: String(weight),
          style: "normal",
          display: "swap",
        })

        const loaded = await face.load()
        document.fonts.add(loaded)
      } catch (err) {
        console.error(
          `[useDynamicFont] Failed to load local font "${source.cssName}" (weight ${weight}) from ${path}:`,
          err,
        )
        throw new Error(
          `Failed to load font file: ${path}. Make sure the file exists in /public/fonts/`,
        )
      }
    }),
  )
}

// ─────────────────────────────────────────────────────────────────
// REACT HOOK
// ─────────────────────────────────────────────────────────────────

interface UseDynamicFontReturn {
  loadFont: (key: FontKey) => Promise<void>
  isLoading: boolean
  error: string | null
}

/**
 * useDynamicFont
 *
 * React wrapper around loadDynamicFont that exposes reactive loading state.
 * Use this in components that need to react to the loading status.
 * For non-React contexts (command handlers, initThemeAndFont), call
 * loadDynamicFont() directly instead.
 *
 * @example
 * const { loadFont, isLoading, error } = useDynamicFont();
 * await loadFont("victor"); // loads Victor Mono on demand
 */

export function useDynamicFont(): UseDynamicFontReturn {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const loadFont = React.useCallback(async (key: FontKey): Promise<void> => {
    if (key === "recursive-casual" || loaded.has(key)) return

    setIsLoading(true)
    setError(null)
    try {
      await loadDynamicFont(key)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      console.error("[useDynamicFont] Font load failed:", err)

      // Display error in terminal if possible
      if (typeof window !== "undefined") {
        const event = new CustomEvent("terminal:font-error", {
          detail: { font: key, error: message },
        })
        window.dispatchEvent(event)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { loadFont, isLoading, error }
}

export default useDynamicFont
