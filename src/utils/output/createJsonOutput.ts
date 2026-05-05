/**
 * createJsonOutput — factory for JSON component blocks.
 *
 * Follows the same pattern as handleTimerCommand and handleDateCommand:
 * return a "component" block with React.createElement so the output
 * bypasses DOMPurify (which would strip interactive attributes) and
 * renders a live React tree instead.
 *
 */

import JsonOutput from "@/components/ui/JsonOutput"
import type { CommandHistoryOutputType } from "@/types"
import * as React from "react"

export function createJsonOutput(data: unknown, label?: string): CommandHistoryOutputType {
  return [
    {
      id: crypto.randomUUID(),
      type: "component" as const,
      component: React.createElement(JsonOutput, { data, label, key: `json-${Date.now()}` }),
    },
  ]
}
