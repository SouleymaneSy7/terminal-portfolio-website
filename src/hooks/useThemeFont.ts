/**
 * useThemeFont — restores saved theme and font preferences on mount.
 *
 * Extracted from Terminal.tsx so the initialization logic has a
 * single owner. If system-theme detection or a preference observer
 * is added in the future, this is the only file that changes.
 */

"use client"

import { initThemeAndFont } from "@/commands/theme-command"
import * as React from "react"

export function useThemeFont(): void {
  React.useEffect(() => {
    initThemeAndFont()
  }, [])
}
