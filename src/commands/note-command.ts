/**
 * In-terminal note management with full CRUD.
 * Data persists in localStorage under "terminal:notes".
 */

import { NOTE_HELP } from "@/constants/help/utils";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { NoteType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";
import { generateShortId } from "@/utils/id";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput } from "@/utils/output";

const NOTES_KEY = STORAGE_KEYS.NOTES;

const getNotes = (): NoteType[] => storageGet<NoteType[]>(NOTES_KEY, []);
const saveNotes = (notes: NoteType[]): boolean => storageSet(NOTES_KEY, notes);

// ─────────────────────────────────────────────────────────────────
// SUBCOMMAND HANDLERS
// ─────────────────────────────────────────────────────────────────

const listNotes = () => {
  const notes = getNotes();

  if (notes.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Notes</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>No notes yet.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note add &lt;text&gt;</span>${DT.decorators.quote} to create one.</p>
        </div>
      </div>`,
    );
  }

  const rows = notes
    .map(
      (n, i) =>
        `<p>
          <span class="text-primary-clr font-bold">${String(i + 1).padStart(2, "0")}</span>
          <span class="text-text-clr opacity-dim"> [</span><span class="text-tertiary-clr">${n.shortId}</span><span class="text-text-clr opacity-dim">]</span>
          <span>  ${n.text}</span>
        </p>`,
    )
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Notes <span class="text-text-clr opacity-dim">(${notes.length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Use <span class="text-tertiary-clr font-bold">note rm &lt;id&gt;</span> or <span class="text-tertiary-clr font-bold">note edit &lt;id&gt; &lt;text&gt;</span> to manage.</p>
      </div>
    </div>`,
  );
};

const addNote = (text: string) => {
  if (!text.trim()) {
    return createErrorOutput(
      "Note text cannot be empty.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">note add &lt;text&gt;</span>`,
    );
  }

  const id = crypto.randomUUID();
  const note: NoteType = {
    id,
    shortId: generateShortId(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const notes = getNotes();
  notes.push(note);
  saveNotes(notes);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Note saved</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">ID    </span>${DT.decorators.arrow}<span class="text-tertiary-clr">${note.shortId}</span></p>
        <p><span class="text-secondary-clr">Text  </span>${DT.decorators.arrow}${note.text}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note</span>${DT.decorators.quote} to view all your notes.</p>
      </div>
    </div>`,
  );
};

const removeNote = (shortId: string) => {
  if (!shortId) {
    return createErrorOutput(
      "Please provide a note ID.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">note rm &lt;id&gt;</span>`,
    );
  }

  const notes = getNotes();
  const idx = notes.findIndex((n) => n.shortId === shortId);

  if (idx === -1) {
    return createErrorOutput(
      `No note found with ID <span class="text-tertiary-clr">"${shortId}"</span>.`,
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note</span>${DT.decorators.quote} to see note IDs.`,
    );
  }

  const [removed] = notes.splice(idx, 1);
  saveNotes(notes);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Note deleted</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Removed  </span>${DT.decorators.arrow}<span class="text-text-clr opacity-dim">${removed.text}</span></p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note</span>${DT.decorators.quote} to view remaining notes.</p>
      </div>
    </div>`,
  );
};

const editNote = (shortId: string, newText: string) => {
  if (!shortId || !newText.trim()) {
    return createErrorOutput(
      `Usage: <span class="text-tertiary-clr font-bold">note edit &lt;id&gt; &lt;new text&gt;</span>`,
    );
  }

  const notes = getNotes();
  const note = notes.find((n) => n.shortId === shortId);

  if (!note) {
    return createErrorOutput(
      `No note found with ID <span class="text-tertiary-clr">"${shortId}"</span>.`,
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note</span>${DT.decorators.quote} to see note IDs.`,
    );
  }

  const oldText = note.text;
  note.text = newText.trim();
  note.updatedAt = new Date().toISOString();
  saveNotes(notes);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Note updated</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Before  </span>${DT.decorators.arrow}<span class="text-text-clr opacity-dim">${oldText}</span></p>
        <p><span class="text-secondary-clr">After   </span>${DT.decorators.arrow}${note.text}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note</span>${DT.decorators.quote} to view all notes.</p>
      </div>
    </div>`,
  );
};

const clearNotes = () => {
  storageRemove(NOTES_KEY);
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} All notes deleted</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note add &lt;text&gt;</span>${DT.decorators.quote} to start fresh.</p>
      </div>
    </div>`,
  );
};

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleNoteCommand = (args: string[]) => {
  const parsed = parseArgs(args);

  if (parsed.flags.help) return NOTE_HELP;

  const sub = parsed.subcommand?.toLowerCase();

  if (!sub || sub === "list") return listNotes();
  if (sub === "help") return NOTE_HELP;
  if (sub === "clear") return clearNotes();
  if (sub === "add") return addNote(parsed.positional.slice(1).join(" "));
  if (sub === "rm" || sub === "remove" || sub === "delete") {
    return removeNote(parsed.positional[1]?.toLowerCase() ?? "");
  }
  if (sub === "edit" || sub === "update") {
    return editNote(
      parsed.positional[1]?.toLowerCase() ?? "",
      parsed.positional.slice(2).join(" "),
    );
  }

  return createErrorOutput(
    `Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">note help</span>${DT.decorators.quote} for all commands.`,
  );
};
