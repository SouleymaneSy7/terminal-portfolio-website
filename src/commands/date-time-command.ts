/**
 * Date & Time Commands
 *
 * @description
 * Display live clock with date, time and timezone.
 * Both commands render the same LiveClock component.
 *
 * @example
 * ```bash
 * date
 * time
 * ```
 */

import LiveClock from "@/components/ui/LiveClock"
import type { CommandHistoryOutputType } from "@/types"
import * as React from "react"

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

export const handleDateCommand = (): CommandHistoryOutputType => [
  {
    id: crypto.randomUUID(),
    type: "component" as const,
    component: React.createElement(LiveClock),
  },
]

export const handleTimeCommand = (): CommandHistoryOutputType => [
  {
    id: crypto.randomUUID(),
    type: "component" as const,
    component: React.createElement(LiveClock),
  },
]
