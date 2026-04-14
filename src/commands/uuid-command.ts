/**
 * Generate UUIDs (v1 and v4) from the terminal.
 *
 */

import { createHtmlOutput } from "@/constants";
import { v1, v4, validate } from "uuid";

const MAX_COUNT = 20;

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

const generateUUIDs = (version: 1 | 4, count: number) => {
  const safeCount = Math.min(Math.max(1, count), MAX_COUNT);
  const gen = version === 1 ? v1 : v4;
  const ids = Array.from({ length: safeCount }, () => gen());
  const vLabel = `v${version}`;

  const rows = ids
    .map((id) => `<p class="text-tertiary-clr font-bold">${id}</p>`)
    .join("\n");

  const countNote =
    safeCount > 1
      ? `<p class="text-text-clr opacity-sep">${safeCount} UUIDs generated</p>`
      : "";

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">UUID ${vLabel}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        ${rows}
        ${countNote}
      </div>

      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">uuid validate &lt;string&gt;</span><span aria-hidden="true">'</span> to validate a UUID.</p>
      </div>
    </div>`,
  );
};

const validateUUID = (input: string) => {
  const isValid = validate(input);
  const statusClass = isValid ? "text-tertiary-clr" : "text-secondary-clr";
  const statusIcon = isValid ? "✓" : "✗";
  const statusText = isValid ? "Valid UUID" : "Invalid UUID";

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">UUID Validation</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Input -  </span>  <span class="text-text-clr">${input}</span></p>
        <p><span class="text-secondary-clr">Result - </span>  <span class="${statusClass} font-bold">${statusIcon}  ${statusText}</span></p>
      </div>
    </div>`,
  );
};

const showUUIDHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">uuid — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr font-bold">uuid                      </span> - Generate one v4 UUID</p>
        <p><span class="text-tertiary-clr font-bold">uuid &lt;n&gt;                  </span> - Generate n UUIDs (max ${MAX_COUNT})</p>
        <p><span class="text-tertiary-clr font-bold">uuid v1                   </span> - Generate one v1 (time-based) UUID</p>
        <p><span class="text-tertiary-clr font-bold">uuid v4                   </span> - Generate one v4 (random) UUID</p>
        <p><span class="text-tertiary-clr font-bold">uuid v1 &lt;n&gt;               </span> - Generate n v1 UUIDs</p>
        <p><span class="text-tertiary-clr font-bold">uuid v4 &lt;n&gt;               </span> - Generate n v4 UUIDs</p>
        <p><span class="text-tertiary-clr font-bold">uuid validate &lt;string&gt;   </span> - Validate a UUID string</p>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Versions</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr">v1  </span>  Time-based. Encodes the current timestamp and MAC address.</p>
        <p><span class="text-tertiary-clr">v4  </span>  Random. Cryptographically secure. Best for most use cases.</p>
      </div>
    </div>`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleUUIDCommand = (args: string[]) => {
  const first = args[0]?.toLowerCase();

  // uuid validate <string>
  if (first === "validate") {
    const input = args.slice(1).join("").trim();
    if (!input) {
      return createHtmlOutput(
        `<div class="space-y-t-section py-t-outer">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Usage: <span class="text-tertiary-clr font-bold">uuid validate &lt;uuid-string&gt;</span></p>
        </div>`,
      );
    }
    return validateUUID(input);
  }

  // uuid help
  if (first === "help") return showUUIDHelp();

  // uuid v1 [n]
  if (first === "v1") {
    const count = parseInt(args[1] ?? "1", 10);
    return generateUUIDs(1, isNaN(count) ? 1 : count);
  }

  // uuid v4 [n]
  if (first === "v4" || !first) {
    const count = parseInt(args[1] ?? "1", 10);
    return generateUUIDs(4, isNaN(count) ? 1 : count);
  }

  // uuid <n>  (shorthand for uuid v4 <n>)
  const n = parseInt(first, 10);
  if (!isNaN(n)) return generateUUIDs(4, n);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown argument: <span class="text-tertiary-clr">"${args[0]}"</span></p>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">uuid help</span><span aria-hidden="true">'</span> for all options.</p>
      </div>
    </div>`,
  );
};
