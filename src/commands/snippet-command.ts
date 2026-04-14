/**
 * In-terminal code snippet manager.
 * Data persists in localStorage under "terminal:snippets".
 *
 */

import { createHtmlOutput } from "@/constants";
import { SnippetType } from "@/types";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";

const SNIPPETS_KEY = "terminal:snippets";

const getSnippets = (): SnippetType[] =>
  storageGet<SnippetType[]>(SNIPPETS_KEY, []);
const saveSnippets = (snips: SnippetType[]): boolean =>
  storageSet(SNIPPETS_KEY, snips);
const makeShortId = (uuid: string): string =>
  uuid.replace(/-/g, "").slice(0, 6);

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

const listSnippets = () => {
  const snips = getSnippets();

  if (snips.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Snippets</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>No snippets saved yet.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">snippet help</span><span aria-hidden="true">'</span> to get started.</p>
        </div>
      </div>`,
    );
  }

  const rows = snips
    .map(
      (s, i) =>
        `<p>
          <span class="text-primary-clr font-bold">${String(i + 1).padStart(2, "0")}</span>
          <span class="text-text-clr opacity-sep">  [</span><span class="text-tertiary-clr">${s.shortId}</span><span class="text-text-clr opacity-sep">]</span>
          <span class="text-text-clr font-bold">  ${s.name}</span>
          <span class="text-text-clr opacity-sep">  ·  </span>
          <span class="text-secondary-clr">${s.lang}</span>
        </p>`,
    )
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Snippets <span class="text-text-clr opacity-sep">(${snips.length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Use <span class="text-tertiary-clr font-bold">snippet show &lt;id&gt;</span> to display code.</p>
      </div>
    </div>`,
  );
};

const addSnippet = (args: string[]) => {
  // snippet add <name> <lang> <code...>
  if (args.length < 3) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Not enough arguments.</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Usage: <span class="text-tertiary-clr font-bold">snippet add &lt;name&gt; &lt;lang&gt; &lt;code&gt;</span></p>
          <p>Example: <span class="text-tertiary-clr">snippet add fibonacci js const fib = n => n &lt;= 1 ? n : fib(n-1) + fib(n-2)</span></p>
        </div>
      </div>`,
    );
  }

  const [name, lang, ...codeParts] = args;
  const code = codeParts.join(" ").trim();

  if (!code) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Code cannot be empty.</p>
      </div>`,
    );
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

  const snips = getSnippets();
  snips.push(snip);
  saveSnippets(snips);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ Snippet saved</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">ID    </span>  <span class="text-tertiary-clr">${snip.shortId}</span></p>
        <p><span class="text-secondary-clr">Name  </span>  ${snip.name}</p>
        <p><span class="text-secondary-clr">Lang  </span>  ${snip.lang}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">snippet show ${snip.shortId}</span><span aria-hidden="true">'</span> to view the code.</p>
      </div>
    </div>`,
  );
};

const showSnippet = (shortId: string) => {
  if (!shortId) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Usage: <span class="text-tertiary-clr font-bold">snippet show &lt;id&gt;</span></p>
      </div>`,
    );
  }

  const snips = getSnippets();
  const snip = snips.find((s) => s.shortId === shortId);

  if (!snip) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> No snippet found with ID <span class="text-tertiary-clr">"${shortId}"</span>.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">snippet</span><span aria-hidden="true">'</span> to see snippet IDs.</p>
        </div>
      </div>`,
    );
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">${snip.name} <span class="text-text-clr opacity-sep">· ${snip.lang}</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
      </div>
      <pre class="whitespace-pre-wrap text-tertiary-clr text-fs-body">${escHtml(snip.code)}</pre>
    </div>`,
  );
};

const removeSnippet = (shortId: string) => {
  if (!shortId) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Usage: <span class="text-tertiary-clr font-bold">snippet rm &lt;id&gt;</span></p>
      </div>`,
    );
  }

  const snips = getSnippets();
  const idx = snips.findIndex((s) => s.shortId === shortId);

  if (idx === -1) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> No snippet found with ID <span class="text-tertiary-clr">"${shortId}"</span>.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">snippet</span><span aria-hidden="true">'</span> to see snippet IDs.</p>
        </div>
      </div>`,
    );
  }

  const [removed] = snips.splice(idx, 1);
  saveSnippets(snips);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ Snippet deleted</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Removed  </span>  <span class="text-text-clr opacity-sep">${removed.name} (${removed.lang})</span></p>
      </div>
    </div>`,
  );
};

const clearSnippets = () => {
  storageRemove(SNIPPETS_KEY);
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ All snippets deleted</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">snippet add</span><span aria-hidden="true">'</span> to start fresh.</p>
      </div>
    </div>`,
  );
};

const showSnippetHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">snippet — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr font-bold">snippet                           </span> - List all snippets</p>
        <p><span class="text-tertiary-clr font-bold">snippet add &lt;name&gt; &lt;lang&gt; &lt;code&gt; </span> - Save a snippet</p>
        <p><span class="text-tertiary-clr font-bold">snippet show &lt;id&gt;                </span> - Display snippet code</p>
        <p><span class="text-tertiary-clr font-bold">snippet rm &lt;id&gt;                  </span> - Delete a snippet</p>
        <p><span class="text-tertiary-clr font-bold">snippet clear                     </span> - Delete all snippets</p>
        <p><span class="text-tertiary-clr font-bold">snippet help                      </span> - Show this guide</p>
      </div>
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Example</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr">snippet add fibonacci js const fib = n =&gt; n &lt;= 1 ? n : fib(n-1) + fib(n-2)</span></p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Snippets persist in your browser across sessions.</p>
      </div>
    </div>`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleSnippetCommand = (args: string[]) => {
  const sub = args[0]?.toLowerCase();

  if (!sub || sub === "list") return listSnippets();
  if (sub === "help") return showSnippetHelp();
  if (sub === "clear") return clearSnippets();
  if (sub === "add") return addSnippet(args.slice(1));
  if (sub === "show") return showSnippet(args[1]?.toLowerCase() ?? "");
  if (sub === "rm" || sub === "remove" || sub === "delete") {
    return removeSnippet(args[1]?.toLowerCase() ?? "");
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span></p>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">snippet help</span><span aria-hidden="true">'</span> for all commands.</p>
      </div>
    </div>`,
  );
};
