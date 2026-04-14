/**
 * Calculate exact age from a birth date using date-fns.
 *
 * Supported date formats:
 *   yyyy-MM-dd   → 1990-01-15  (ISO — preferred)
 *   dd/MM/yyyy   → 15/01/1990  (European)
 *   MM/dd/yyyy   → 01/15/1990  (American)
 *   dd-MM-yyyy   → 15-01-1990
 *   yyyy/MM/dd   → 1990/01/15
 *
 * Output: age in years/months/days, day of week born, next birthday countdown.
 */

import { createHtmlOutput } from "@/constants";
import { ParsedDateType } from "@/types";
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

  // Last birthday this year (or previous year if not yet passed)
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

  // Next birthday
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
  const isBirthdayToday = daysUntilBirthday === 0;

  return {
    years,
    months,
    days,
    daysUntilBirthday,
    isBirthdayToday,
    nextBirthday,
  };
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

const showAgeHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">age — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Calculate your exact age from a birth date.</p>
        <p>Usage: <span class="text-tertiary-clr font-bold">age &lt;date&gt;</span></p>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Supported Formats</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr">1990-01-15  </span>  ISO (preferred)</p>
        <p><span class="text-tertiary-clr">15/01/1990  </span>  European</p>
        <p><span class="text-tertiary-clr">01/15/1990  </span>  American</p>
        <p><span class="text-tertiary-clr">15-01-1990  </span>  Dash-separated</p>
      </div>
    </div>`,
  );

export const handleAgeCommand = (args: string[]) => {
  const input = args.join(" ").trim();

  if (!input || input === "help") return showAgeHelp();

  const parsed = tryParse(input);

  if (!parsed) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Could not parse date: <span class="text-tertiary-clr">"${input}"</span></p>
          <p>Date must be in the past and in a recognised format.</p>
        </div>
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Supported formats</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p><span class="text-tertiary-clr">1990-01-15</span>  ·  <span class="text-tertiary-clr">15/01/1990</span>  ·  <span class="text-tertiary-clr">01/15/1990</span>  ·  <span class="text-tertiary-clr">15-01-1990</span></p>
        </div>
      </div>`,
    );
  }

  const { date } = parsed;
  const {
    years,
    months,
    days,
    daysUntilBirthday,
    isBirthdayToday,
    nextBirthday,
  } = calcAge(date);

  const formattedBirth = format(date, "EEEE, MMMM dd, yyyy");
  const dayOfWeek = format(date, "EEEE");
  const nextBdayStr = format(nextBirthday, "MMMM dd, yyyy");

  const birthdayNote = isBirthdayToday
    ? `<p class="text-tertiary-clr font-bold">🎂 Happy Birthday! 🎉</p>`
    : daysUntilBirthday === 1
      ? `<p><span class="text-secondary-clr">Next birthday</span> - Tomorrow — <span class="text-tertiary-clr">${nextBdayStr}</span></p>`
      : `<p><span class="text-secondary-clr">Next birthday</span> - ${nextBdayStr} <span class="text-text-clr opacity-sep">(${daysUntilBirthday} days)</span></p>`;

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
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Born on</span> - ${formattedBirth}</p>
      </div>
      <div class="space-y-t-group">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>
          <span class="text-tertiary-clr font-bold" style="font-size: var(--text-fs-title);">${years}</span>
          <span class="text-secondary-clr font-bold"> years old</span>
        </p>
        ${detailLine}
      </div>
      <div class="space-y-t-group">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Day of week</span> - You were born on a <span class="text-tertiary-clr">${dayOfWeek}</span></p>
        ${birthdayNote}
      </div>
    </div>`,
  );
};
