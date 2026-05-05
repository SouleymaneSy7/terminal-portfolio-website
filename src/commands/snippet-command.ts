/**
 * In-terminal code snippet manager.
 * Data persists in localStorage under "terminal:snippets".
 *
 * Subcommands: list, add, show, rm, clear, help
 */

import type { CommandHistoryOutputType, SnippetType } from "@/types";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";
import { SNIPPET_HELP } from "@/constants/help/utils";
import { parseArgs } from "@/utils/argParser";

import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";
import { STORAGE_KEYS } from "@/constants/storageKeys";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────

const SNIPPETS_KEY = STORAGE_KEYS.SNIPPETS;
const MAX_SNIPPETS = 50;

// ─────────────────────────────────────────────────────────────────
// STORAGE HELPERS
// ─────────────────────────────────────────────────────────────────

const getSnippets = (): SnippetType[] => storageGet<SnippetType[]>(SNIPPETS_KEY, []);
const saveSnippets = (snips: SnippetType[]): boolean => storageSet(SNIPPETS_KEY, snips);
const makeShortId = (uuid: string): string => uuid.replace(/-/g, "").slice(0, 8);

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─────────────────────────────────────────────────────────────────
// SUBCOMMAND HANDLERS
// ─────────────────────────────────────────────────────────────────

function listSnippets(): CommandHistoryOutputType {
  const snips = getSnippets();

  if (snips.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Snippets</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>No snippets saved yet.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">snippet help</span>${DT.decorators.quote} to get started.</p>
        </div>
      </div>`,
    );
  }

  const rows = snips
    .map((s, i) => {
      const safeName = escHtml(s.name);
      const safeLang = escHtml(s.lang);
      const safeShortId = escHtml(s.shortId);

      return `<p>
          <span class="text-primary-clr font-bold">${String(i + 1).padStart(2, "0")}</span>
          <span class="text-text-clr opacity-sep">  [</span><span class="text-tertiary-clr">${safeShortId}</span><span class="text-text-clr opacity-sep">]</span>
          <span class="text-text-clr font-bold">${safeName}</span>
          <span class="text-text-clr opacity-sep">  ·  </span>
          <span class="text-secondary-clr">${safeLang}</span>
        </p>`;
    })
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Snippets <span class="text-text-clr opacity-sep">(${snips.length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Use <span class="text-tertiary-clr font-bold">snippet show &lt;id&gt;</span> to display code.</p>
      </div>
    </div>`,
  );
}

function addSnippet(args: string[]): CommandHistoryOutputType {
  if (args.length < 3) {
    return createErrorOutput(
      "Not enough arguments.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">snippet add &lt;name&gt; &lt;lang&gt; &lt;code&gt;</span>`,
    );
  }

  const [name, lang, ...codeParts] = args;
  const code = codeParts.join(" ").trim();
  const trimmedName = name.trim();
  const trimmedLang = lang.trim().toLowerCase();

  if (!trimmedName) return createErrorOutput("Snippet name cannot be empty.");
  if (!trimmedLang) return createErrorOutput("Language cannot be empty.");

  if (!code) {
    return createErrorOutput("Code cannot be empty.");
  }

  const id = crypto.randomUUID();
  const snip: SnippetType = {
    id,
    shortId: makeShortId(id),
    name: name.trim(),
    lang: lang.trim().toLowerCase(),
    code,
    createdAt: new Date().toISOString(),
  };

  const safeName = escHtml(snip.name);
  const safeLang = escHtml(snip.lang);
  const safeShortId = escHtml(snip.shortId);

  const snips = getSnippets();
  const existing = snips.find((s) => s.shortId === snip.shortId);

  if (existing) {
    snip.shortId = makeShortId(crypto.randomUUID());
  }

  if (snips.length >= MAX_SNIPPETS) {
    return createErrorOutput(
      `Snippet limit reached (${MAX_SNIPPETS}).`,
      `Run <span class="text-tertiary-clr font-bold">snippet rm &lt;id&gt;</span> to free space.`,
    );
  }

  snips.push(snip);

  const saved = saveSnippets(snips);
  if (!saved) {
    return createErrorOutput("Failed to save snippet.", "localStorage may be full or unavailable.");
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${DT.icons.success}  <span class="text-tertiary-clr font-bold">Snippet saved</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">ID    </span>  <span class="text-tertiary-clr">${safeShortId}</span></p>
        <p><span class="text-secondary-clr">Name  </span>  ${safeName}</p>
        <p><span class="text-secondary-clr">Lang  </span>  ${safeLang}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">snippet show ${safeShortId}</span>${DT.decorators.quote} to view the code.</p>
      </div>
    </div>`,
  );
}

async function showSnippet(shortId: string): Promise<CommandHistoryOutputType> {
  if (!shortId) {
    return createErrorOutput(
      "Missing snippet ID.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">snippet show &lt;id&gt;</span>`,
    );
  }

  const snip = getSnippets().find((s) => s.shortId === shortId);

  if (!snip) {
    return createErrorOutput(
      `No snippet found with ID <span class="text-tertiary-clr">"${shortId}"</span>.`,
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">snippet</span>${DT.decorators.quote} to see snippet IDs.`,
    );
  }

  // Lazy-load highlight.js and apply syntax highlighting
  let highlighted = escHtml(snip.code);
  try {
    const hljs = (await import("highlight.js")).default;
    await import("highlight.js/styles/atom-one-dark.css");

    const validLang = hljs.getLanguage(snip.lang) ? snip.lang : "plaintext";
    highlighted = hljs.highlight(snip.code, { language: validLang }).value;
  } catch {
    // Fallback to escaped plain text if hljs fails
  }

  const safeName = escHtml(snip.name);
  const safeLang = escHtml(snip.lang);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">${safeName} <span class="text-text-clr opacity-sep">· ${safeLang}</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
      </div>
      <pre class="whitespace-pre-wrap text-tertiary-clr text-fs-body">${highlighted}</pre>
    </div>`,
  );
}

function removeSnippet(shortId: string): CommandHistoryOutputType {
  if (!shortId) {
    return createErrorOutput(
      "Missing snippet ID.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">snippet rm &lt;id&gt;</span>`,
    );
  }

  const snips = getSnippets();
  const idx = snips.findIndex((s) => s.shortId === shortId);

  if (idx === -1) {
    return createErrorOutput(
      `No snippet found with ID <span class="text-tertiary-clr">"${shortId}"</span>.`,
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">snippet</span>${DT.decorators.quote} to see snippet IDs.`,
    );
  }

  const [removed] = snips.splice(idx, 1);

  const safeName = escHtml(removed.name);
  const safeLang = escHtml(removed.lang);

  const saved = saveSnippets(snips);
  if (!saved) {
    return createErrorOutput("Failed to update snippets after deletion.");
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${DT.icons.success}  <span class="text-tertiary-clr font-bold">Snippet deleted</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Removed  </span>  <span class="text-text-clr opacity-sep">${safeName} (${safeLang})</span></p>
      </div>
    </div>`,
  );
}

function clearSnippets(): CommandHistoryOutputType {
  storageRemove(SNIPPETS_KEY);
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p>${DT.icons.success}  <span class="text-tertiary-clr font-bold">All snippets deleted</span></p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">snippet add</span>${DT.decorators.quote} to start fresh.</p>
      </div>
    </div>`,
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleSnippetCommand = async (args: string[]): Promise<CommandHistoryOutputType> => {
  const parsed = parseArgs(args);

  if (parsed.flags.help) return SNIPPET_HELP;

  const sub = parsed.subcommand?.toLowerCase();

  if (!sub || sub === "list") return listSnippets();
  if (sub === "clear") return clearSnippets();
  if (sub === "add") return addSnippet(parsed.positional.slice(1));
  if (sub === "show") return showSnippet(parsed.positional[1]?.toLowerCase() ?? "");
  if (sub === "rm" || sub === "remove" || sub === "delete") {
    return removeSnippet(parsed.positional[1]?.toLowerCase() ?? "");
  }

  return createErrorOutput(
    `Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">snippet help</span>${DT.decorators.quote} for all commands.`,
  );
};
