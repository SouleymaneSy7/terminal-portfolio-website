/**
 * loader — select the loading indicator style.
 *
 * Mirrors the pattern of theme-command.ts and typeface-command.ts.
 * The chosen variant is persisted in localStorage and restored on
 * every page load via initThemeAndFont() (or a dedicated hook call).
 *
 * @example
 * ```bash
 * loader
 * loader braille
 * loader --random
 * ```
 */

import { STORAGE_KEYS } from "@/constants/storageKeys";
import type { CommandHistoryOutputType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import type { LoadingVariant } from "@/types";
import { LOADER_HELP } from "@/constants/help/system";

// ─────────────────────────────────────────────────────────────────
// REGISTRY
// ─────────────────────────────────────────────────────────────────

export const LOADERS: Record<
  LoadingVariant,
  { label: string; description: string; preview: string }
> = {
  braille: {
    label: "Braille Spinner",
    description: "Smooth Unicode braille rotation — the default",
    preview: "⣾ processing command...",
  },
  ascii: {
    label: "ASCII Progress Bar",
    description: "Classic animated progress bar with block characters",
    preview: "[████████████░░░░░░░░]  60%",
  },
  spinner: {
    label: "Rotating Spinner",
    description: "Minimal rotating slash — real terminal feel",
    preview: "/ processing command...",
  },
  typewriter: {
    label: "Typewriter Cursor",
    description: "Animated text with blinking underscore",
    preview: "fetching data_",
  },
  dots: {
    label: "Dots Accumulator",
    description: "Ellipsis that grows and resets — friendly and subtle",
    preview: "processing command...",
  },
} as const;

export const LOADER_STORAGE_KEY = STORAGE_KEYS.LOADER;
const DEFAULT_LOADER: LoadingVariant = "braille";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

export const getCurrentLoader = (): LoadingVariant => {
  if (typeof window === "undefined") return DEFAULT_LOADER;
  const saved = localStorage.getItem(LOADER_STORAGE_KEY) as LoadingVariant | null;
  return saved && saved in LOADERS ? saved : DEFAULT_LOADER;
};

export const applyLoader = (variant: LoadingVariant): void => {
  try {
    localStorage.setItem(LOADER_STORAGE_KEY, variant);
    window.dispatchEvent(new CustomEvent("terminal:loader-change", { detail: { variant } }));
  } catch (err) {
    console.error("[Loader - apply] failed to set:", err);
  }
};

export const getLoaderLabel = (key: LoadingVariant): string => LOADERS[key]?.label ?? key;

// ─────────────────────────────────────────────────────────────────
// OUTPUT BUILDERS
// ─────────────────────────────────────────────────────────────────

const getLoaderListOutput = (): CommandHistoryOutputType => {
  const current = getCurrentLoader();

  const rows = (Object.entries(LOADERS) as [LoadingVariant, (typeof LOADERS)[LoadingVariant]][])
    .map(([key, loader]) => {
      const isActive = key === current;
      const nameClass = isActive ? "text-primary-clr font-bold" : "text-tertiary-clr";
      const activeTag = isActive
        ? ` <span class="text-primary-clr font-bold"> ← active</span>`
        : "";
      return `<div class="space-y-t-group">
        <p>
          <span class="${nameClass}">${loader.label.padEnd(22)}</span>
          <span class="text-text-clr"> - ${loader.description}.</span>${activeTag}
        </p>
        <p class="text-text-clr opacity-sep pl-4">↳ ${loader.preview}</p>

      </div>`;
    })
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Loading Indicators <span class="text-text-clr opacity-sep">(5 available)</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      </div>
      ${rows}
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">loader &lt;name&gt;</span>${DT.decorators.quote} to switch.</p>
        <p class="text-text-clr opacity-sep"><span class="text-primary-clr">Tip:</span> type a long-running command like ${DT.decorators.quote}<span class="text-tertiary-clr">weather Paris</span>${DT.decorators.quote} to preview it.</p>
      </div>
    </div>`,
  );
};

const getLoaderSwitchOutput = (variant: LoadingVariant): CommandHistoryOutputType => {
  applyLoader(variant);
  const { label, description, preview } = LOADERS[variant];

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">${DT.icons.success} Loader switched${DT.decorators.arrow}${label}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${description}.</p>
               <p class="text-text-clr opacity-sep pl-4">↳ ${preview}</p>
        <p><span class="text-primary-clr font-bold">${DT.icons.success} Preference saved.</span> Active immediately.</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">loader</span>${DT.decorators.quote} to see all styles.</p>
      </div>
    </div>`,
  );
};

const getLoaderInvalidOutput = (name: string): CommandHistoryOutputType =>
  createErrorOutput(
    `Unknown loader: <span class="text-tertiary-clr">"${name}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">loader</span>${DT.decorators.quote} to see all available styles.`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleLoaderCommand = (args: string[]): CommandHistoryOutputType => {
  const parsed = parseArgs(args);

  if (parsed.flags.help) return LOADER_HELP;

  if (parsed.flags.random || parsed.flags.r) {
    const keys = Object.keys(LOADERS) as LoadingVariant[];
    const random = keys[Math.floor(Math.random() * keys.length)];
    return getLoaderSwitchOutput(random);
  }

  const name = parsed.positional.join(" ").trim().toLowerCase() as LoadingVariant | "random";
  if (!name) return getLoaderListOutput();
  if (name === "random") {
    const keys = Object.keys(LOADERS) as LoadingVariant[];
    const random = keys[Math.floor(Math.random() * keys.length)];
    return getLoaderSwitchOutput(random);
  }
  if (name in LOADERS) return getLoaderSwitchOutput(name);
  return getLoaderInvalidOutput(name);
};
