/**
 * timer — start a countdown in the terminal.
 *
 * Duration formats: 25m, 1h, 1h30m, 90s, 3600 (bare seconds)
 * Renders a live countdown via the TimerWidget React component.
 */

import TimerWidget from "@/components/ui/TimerWidget";
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput } from "@/utils/output";
import { TIMER_HELP } from "@/constants/help/utils";
import * as React from "react";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const MAX_SECONDS = 24 * 60 * 60; // 24 hours

// ─────────────────────────────────────────────────────────────────
// PARSER
// ─────────────────────────────────────────────────────────────────

function parseDuration(input: string): number | null {
  const s = input.trim().toLowerCase();

  if (/^\d+$/.test(s)) {
    const n = parseInt(s, 10);
    return n > 0 ? n : null;
  }

  let total = 0;
  const hourMatch = s.match(/(\d+)h/);
  const minMatch = s.match(/(\d+)m/);
  const secMatch = s.match(/(\d+)s/);

  if (hourMatch) total += parseInt(hourMatch[1], 10) * 3600;
  if (minMatch) total += parseInt(minMatch[1], 10) * 60;
  if (secMatch) total += parseInt(secMatch[1], 10);

  return total > 0 ? total : null;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleTimerCommand = (args: string[]): CommandHistoryOutputType => {
  const parsed = parseArgs(args);

  if (parsed.flags.help) return TIMER_HELP;

  if (parsed.positional.length === 0) {
    return createErrorOutput(
      'Missing required argument <span class="text-tertiary-clr">&lt;duration&gt;</span>.',
      `Usage: <span class="text-tertiary-clr font-bold">timer &lt;duration&gt; [label]</span>  e.g. <span class="text-tertiary-clr">timer 25m Pomodoro</span>`,
    );
  }

  const totalSeconds = parseDuration(parsed.positional[0]);

  if (!totalSeconds) {
    return createErrorOutput(
      `Invalid duration: <span class="text-tertiary-clr">"${parsed.positional[0]}"</span>`,
      `Valid examples: <span class="text-tertiary-clr">25m</span> ${DT.decorators.bullet} <span class="text-tertiary-clr">1h</span> ${DT.decorators.bullet} <span class="text-tertiary-clr">1h30m</span> ${DT.decorators.bullet} <span class="text-tertiary-clr">90s</span> ${DT.decorators.bullet} <span class="text-tertiary-clr">3600</span>`,
    );
  }

  if (totalSeconds > MAX_SECONDS) {
    return createErrorOutput(
      `Duration <span class="text-tertiary-clr">${formatDuration(totalSeconds)}</span> exceeds the 24-hour maximum.`,
      `Max allowed: <span class="text-tertiary-clr">24h</span>`,
    );
  }

  const label = parsed.positional.slice(1).join(" ") || undefined;

  return [
    {
      id: crypto.randomUUID(),
      type: "component" as const,
      component: React.createElement(TimerWidget, {
        totalSeconds,
        label,
        key: `timer-${totalSeconds}-${Date.now()}`,
      }),
    },
  ];
};
