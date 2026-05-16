/**
 * alias / unalias — persistent command shortcuts.
 *
 * Aliases are resolved in executeCommand before the registry lookup,
 * so they work transparently for every command, including unknown ones.
 * Resolution is intentionally single-level to prevent infinite loops.
 *
 * @example
 * ```bash
 * alias g="github SouleymaneSy7"   # create / update
 * alias projects="projects --help" # alias with flags in the value
 * alias                            # list all defined aliases
 * unalias g                        # remove a single alias
 * ```
 */

import { ALIAS_HELP, UNALIAS_HELP } from "@/constants/help/system";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput, createSuccessOutput } from "@/utils/output";
import type { CommandHistoryOutputType } from "@/types";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const ALIASES_KEY = STORAGE_KEYS.ALIASES;
const MAX_ALIASES = 30;
const MAX_VALUE_LENGTH = 200;

/**
 * Valid alias names mirror POSIX: letter or underscore to start,
 * then alphanumeric, hyphens, or underscores.
 */
const ALIAS_NAME_REGEX = /^[a-zA-Z_][a-zA-Z0-9_-]*$/;

/**
 * Names reserved by the terminal's special-case logic in executeCommand.
 * These bypass the registry entirely and cannot be aliased.
 */
const PROTECTED_NAMES = new Set(["clear"]);

// ─────────────────────────────────────────────────────────────────
// STORAGE HELPERS
// ─────────────────────────────────────────────────────────────────

export const getAliasMap = (): Record<string, string> =>
  storageGet<Record<string, string>>(ALIASES_KEY, {});

const saveAliases = (aliases: Record<string, string>): boolean => storageSet(ALIASES_KEY, aliases);

// ─────────────────────────────────────────────────────────────────
// PARSER
// ─────────────────────────────────────────────────────────────────

/**
 * Parses an alias definition string of the form:
 *   name="value with spaces"  →  { name: "name", value: "value with spaces" }
 *   name='value'              →  { name: "name", value: "value" }
 *   name=value                →  { name: "name", value: "value" }
 *
 * The input is already the result of joining all positional tokens with a
 * space, so the quotes from the user's raw input are preserved.
 */
function parseAliasDefinition(rawInput: string): { name: string; value: string } | null {
  const eqIdx = rawInput.indexOf("=");
  if (eqIdx < 1) return null;

  const name = rawInput.slice(0, eqIdx).trim();
  let value = rawInput.slice(eqIdx + 1).trim();

  // Strip exactly one surrounding quote pair (double or single)
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      value = value.slice(1, -1);
    }
  }

  if (!name || !value) return null;
  return { name, value };
}

// ─────────────────────────────────────────────────────────────────
// SUBCOMMAND HANDLERS
// ─────────────────────────────────────────────────────────────────

function listAliases() {
  const aliases = getAliasMap();
  const entries = Object.entries(aliases);

  if (entries.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Aliases</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>No aliases defined yet.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>
            Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">alias name="command [args]"</span>${DT.decorators.quote}
            to create one.
          </p>
        </div>
      </div>`,
    );
  }

  const rows = entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([name, value]) =>
        `<p>
          <span class="text-tertiary-clr font-bold">${name}</span>
          <span class="text-text-clr opacity-dim"> = </span>
          <span class="text-text-clr">${value}</span>
        </p>`,
    )
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Aliases <span class="text-text-clr opacity-dim">(${entries.length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">unalias &lt;name&gt;</span>${DT.decorators.quote} to remove an alias.</p>
      </div>
    </div>`,
  );
}

function addAlias(rawInput: string) {
  if (!rawInput.trim()) {
    return createErrorOutput(
      "Missing alias definition.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">alias name="command [args]"</span>`,
    );
  }

  const parsed = parseAliasDefinition(rawInput);

  if (!parsed) {
    return createErrorOutput(
      `Invalid alias syntax: <span class="text-tertiary-clr">${rawInput}</span>`,
      `Expected: <span class="text-tertiary-clr font-bold">alias name="command [args]"</span>  ${DT.decorators.bullet}  e.g. <span class="text-tertiary-clr">alias g="github SouleymaneSy7"</span>`,
    );
  }

  const { name, value } = parsed;

  if (!ALIAS_NAME_REGEX.test(name)) {
    return createErrorOutput(
      `Invalid alias name: <span class="text-tertiary-clr">"${name}"</span>`,
      `Names must start with a letter or underscore, then contain only alphanumeric characters, hyphens, or underscores.`,
    );
  }

  if (PROTECTED_NAMES.has(name)) {
    return createErrorOutput(
      `Cannot alias <span class="text-tertiary-clr">${name}</span> — it is a protected built-in.`,
    );
  }

  if (value.length > MAX_VALUE_LENGTH) {
    return createErrorOutput(
      `Alias value too long (${value.length} chars, max ${MAX_VALUE_LENGTH}).`,
    );
  }

  const aliases = getAliasMap();
  const isUpdate = name in aliases;

  if (!isUpdate && Object.keys(aliases).length >= MAX_ALIASES) {
    return createErrorOutput(
      `Alias limit reached (${MAX_ALIASES}).`,
      `Run <span class="text-tertiary-clr font-bold">unalias &lt;name&gt;</span> to free up a slot.`,
    );
  }

  aliases[name] = value;
  saveAliases(aliases);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Alias ${isUpdate ? "updated" : "created"}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-secondary-clr">Name      </span>${DT.decorators.arrow}<span class="text-tertiary-clr font-bold">${name}</span>
        </p>
        <p>
          <span class="text-secondary-clr">Expands to</span>${DT.decorators.arrow}<span class="text-text-clr">${value}</span>
        </p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">${name}</span>${DT.decorators.quote}
          to use it ${DT.decorators.bullet}
          ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">alias</span>${DT.decorators.quote}
          to list all aliases.
        </p>
      </div>
    </div>`,
  );
}

export function removeAlias(name: string) {
  if (!name.trim()) {
    return createErrorOutput(
      "Missing alias name.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">unalias &lt;name&gt;</span>`,
    );
  }

  const aliases = getAliasMap();

  if (!(name in aliases)) {
    return createErrorOutput(
      `No alias found: <span class="text-tertiary-clr">"${name}"</span>`,
      `Type <span class="text-tertiary-clr font-bold">alias</span> to see all defined aliases.`,
    );
  }

  const removedValue = aliases[name];
  delete aliases[name];

  if (Object.keys(aliases).length === 0) {
    storageRemove(ALIASES_KEY);
  } else {
    saveAliases(aliases);
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Alias removed</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>
          <span class="text-secondary-clr">Name      </span>${DT.decorators.arrow}
          <span class="text-text-clr opacity-dim">${name}</span>
        </p>
        <p>
          <span class="text-secondary-clr">Expanded  </span>${DT.decorators.arrow}
          <span class="text-text-clr opacity-dim">${removedValue}</span>
        </p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type <span class="text-tertiary-clr font-bold">alias</span> to see remaining aliases.</p>
      </div>
    </div>`,
  );
}

export const clearAllAliases = (): CommandHistoryOutputType => {
  const aliases = getAliasMap();
  const count = Object.keys(aliases).length;

  if (count === 0) {
    return createSuccessOutput(
      `No aliases to clear. Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">alias name="command"</span>${DT.decorators.quote} to create one.`,
    );
  }

  storageRemove(ALIASES_KEY);

  return createSuccessOutput(`${count} alias${count > 1 ? "es" : ""} cleared.`);
};

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLERS (exported)
// ─────────────────────────────────────────────────────────────────

/**
 * Avoid using parseArgs here — it would greedily consume `--help"` (with
 * trailing quote) from a value like `alias g="test --help"` as a flag.
 * Instead we do a targeted check and join the rest as raw input.
 */
export const handleAliasCommand = (args: string[]) => {
  if (args.length === 0) return listAliases();
  if (args[0]?.toLowerCase() === "list") return listAliases();
  if (args.includes("--help") || args.includes("-h") || args[0] === "help") return ALIAS_HELP;

  // Rejoin to reconstruct the full definition, e.g.
  //   ['g="github', 'SouleymaneSy7"']  →  'g="github SouleymaneSy7"'
  return addAlias(args.join(" "));
};

export const handleUnaliasCommand = (args: string[]) => {
  if (args.includes("--help") || args.includes("-h") || args[0] === "help") return UNALIAS_HELP;
  if (args.includes("--all") || args[0]?.toLowerCase() === "clear") return clearAllAliases();

  return removeAlias(args[0]?.trim() ?? "");
};
