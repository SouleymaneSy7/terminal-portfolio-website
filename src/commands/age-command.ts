/**
 * Age Calculator Command
 *
 * Calculates exact age from a birth date using date-fns.
 *
 * Supported date formats:
 *   yyyy-MM-dd   → 1990-01-15  (ISO — preferred)
 *   dd/MM/yyyy   → 15/01/1990  (European)
 *   MM/dd/yyyy   → 01/15/1990  (American)
 *   dd-MM-yyyy   → 15-01-1990
 *   yyyy/MM/dd   → 1990/01/15
 *
 * @example
 * ```bash
 * age 1990-01-15
 * age --help
 * ```
 */

import { AGE_HELP } from "@/constants/help/utils";
import type { CommandHistoryOutputType, ParsedDateType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  isFuture,
  isValid,
  parse,
  parseISO,
} from "date-fns";

// ─────────────────────────────────────────────────────────────────
// DATE PARSING
// ─────────────────────────────────────────────────────────────────

function tryParse(input: string): ParsedDateType | null {
  const ref = new Date();

  const formats: Array<{ fmt: string; label: string }> = [
    { fmt: "yyyy-MM-dd", label: "ISO (yyyy-MM-dd)" },
    { fmt: "dd/MM/yyyy", label: "European (dd/MM/yyyy)" },
    { fmt: "MM/dd/yyyy", label: "American (MM/dd/yyyy)" },
    { fmt: "dd-MM-yyyy", label: "dd-MM-yyyy" },
    { fmt: "yyyy/MM/dd", label: "yyyy/MM/dd" },
  ];

  for (const { fmt, label } of formats) {
    const parsed = parse(input.trim(), fmt, ref);
    if (isValid(parsed) && !isFuture(parsed)) {
      return { date: parsed, originalFormat: label };
    }
  }

  // ISO fallback (handles partial ISO like "1990-01")
  const iso = parseISO(input.trim());
  if (isValid(iso) && !isFuture(iso)) {
    return { date: iso, originalFormat: "ISO" };
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────
// AGE CALCULATION
// ─────────────────────────────────────────────────────────────────

function calcAge(birthDate: Date) {
  const now = new Date();

  const years = differenceInYears(now, birthDate);

  const lastBirthday = (() => {
    const candidate = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    return candidate > now
      ? new Date(
          now.getFullYear() - 1,
          birthDate.getMonth(),
          birthDate.getDate(),
        )
      : candidate;
  })();

  const months = differenceInMonths(now, lastBirthday);
  const afterMonths = new Date(lastBirthday);
  afterMonths.setMonth(afterMonths.getMonth() + months);
  const days = differenceInDays(now, afterMonths);

  const nextBirthday = (() => {
    const candidate = new Date(
      now.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );
    return candidate <= now
      ? new Date(
          now.getFullYear() + 1,
          birthDate.getMonth(),
          birthDate.getDate(),
        )
      : candidate;
  })();

  const daysUntilBirthday = differenceInDays(nextBirthday, now);

  return { years, months, days, daysUntilBirthday, nextBirthday };
}

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

function createAgeOutput(date: Date): CommandHistoryOutputType {
  const { years, months, days, daysUntilBirthday, nextBirthday } =
    calcAge(date);

  const formattedBirth = format(date, "EEEE, MMMM dd, yyyy");
  const dayOfWeek = format(date, "EEEE");
  const nextBdayStr = format(nextBirthday, "MMMM dd, yyyy");

  const birthdayNote =
    daysUntilBirthday === 0
      ? `<p class="text-tertiary-clr font-bold">🎂 Happy Birthday! 🎉</p>`
      : daysUntilBirthday === 1
        ? `<p><span class="text-secondary-clr">Next birthday</span>${DT.decorators.arrow}Tomorrow — <span class="text-tertiary-clr">${nextBdayStr}</span></p>`
        : `<p><span class="text-secondary-clr">Next birthday</span>${DT.decorators.arrow}<span class="text-tertiary-clr">${nextBdayStr}</span> <span class="text-text-clr opacity-sep">(${daysUntilBirthday} days)</span></p>`;

  const detailParts = [
    months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "",
    days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  const detailLine = detailParts
    ? `<p class="text-text-clr opacity-sep">${years} years, ${detailParts}</p>`
    : "";

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Age Calculator</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Born on</span>${DT.decorators.arrow}${formattedBirth}</p>
      </div>

      <div class="space-y-t-group">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-tertiary-clr font-bold text-fs-title">${years}</span>
          <span class="text-secondary-clr font-bold"> years old</span>
        </p>
        ${detailLine}
      </div>

      <div class="space-y-t-group">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Day of week</span>${DT.decorators.arrow}You were born on a <span class="text-tertiary-clr font-bold">${dayOfWeek}</span></p>
        ${birthdayNote}
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleAgeCommand = (args: string[]): CommandHistoryOutputType => {
  const parsed = parseArgs(args);

  if (parsed.flags.help) return AGE_HELP;

  const input = parsed.positional.join(" ").trim();

  if (!input) {
    return createErrorOutput(
      'Missing required argument <span class="text-tertiary-clr">&lt;date&gt;</span>.',
      `Type <span class="text-tertiary-clr font-bold">${DT.decorators.quote}age --help${DT.decorators.quote}</span> for supported date formats.`,
    );
  }

  const result = tryParse(input);

  if (!result) {
    return createErrorOutput(
      `Could not parse date: <span class="text-tertiary-clr">"${input}"</span>`,
      `Supported: <span class="text-tertiary-clr">1990-01-15</span>  ${DT.decorators.bullet}  <span class="text-tertiary-clr">15/01/1990</span>  ${DT.decorators.bullet}  <span class="text-tertiary-clr">01/15/1990</span>  ${DT.decorators.bullet}  <span class="text-tertiary-clr">15-01-1990</span>`,
    );
  }

  return createAgeOutput(result.date);
};
