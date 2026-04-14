/**
 * In-terminal note management with full CRUD.
 * Data persists in localStorage under "terminal:notes".
 *
 */

import { createHtmlOutput } from "@/constants";
import { NoteType } from "@/types";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";

// ─────────────────────────────────────────────────────────────────
// TYPES & STORAGE
// ─────────────────────────────────────────────────────────────────

const NOTES_KEY = "terminal:notes";

const getNotes = (): NoteType[] => storageGet<NoteType[]>(NOTES_KEY, []);
const saveNotes = (notes: NoteType[]): boolean => storageSet(NOTES_KEY, notes);
const makeShortId = (uuid: string): string =>
  uuid.replace(/-/g, "").slice(0, 6);

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

const listNotes = () => {
  const notes = getNotes();

  if (notes.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Notes</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>No notes yet.</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">note add &lt;text&gt;</span><span aria-hidden="true">'</span> to create one.</p>
        </div>
      </div>`,
    );
  }

  const rows = notes
    .map(
      (n, i) =>
        `<p>
          <span class="text-primary-clr font-bold">${String(i + 1).padStart(2, "0")}</span>
          <span class="text-text-clr opacity-sep"> [</span><span class="text-tertiary-clr">${n.shortId}</span><span class="text-text-clr opacity-sep">]</span>
          <span>  ${n.text}</span>
        </p>`,
    )
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">Notes <span class="text-text-clr opacity-sep">(${notes.length})</span></p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Use <span class="text-tertiary-clr font-bold">note rm &lt;id&gt;</span> or <span class="text-tertiary-clr font-bold">note edit &lt;id&gt; &lt;text&gt;</span> to manage.</p>
      </div>
    </div>`,
  );
};

const addNote = (text: string) => {
  if (!text.trim()) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Note text cannot be empty.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Usage: <span class="text-tertiary-clr font-bold">note add &lt;text&gt;</span></p>
        </div>
      </div>`,
    );
  }

  const id = crypto.randomUUID();
  const note: NoteType = {
    id,
    shortId: makeShortId(id),
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
        <p class="text-tertiary-clr font-bold">✓ Note saved</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">ID    </span>  <span class="text-tertiary-clr">${note.shortId}</span></p>
        <p><span class="text-secondary-clr">Text  </span>  ${note.text}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">note</span><span aria-hidden="true">'</span> to view all your notes.</p>
      </div>
    </div>`,
  );
};

const removeNote = (shortId: string) => {
  if (!shortId) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Please provide a note ID.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Usage: <span class="text-tertiary-clr font-bold">note rm &lt;id&gt;</span></p>
        </div>
      </div>`,
    );
  }

  const notes = getNotes();
  const idx = notes.findIndex((n) => n.shortId === shortId);

  if (idx === -1) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> No note found with ID <span class="text-tertiary-clr">"${shortId}"</span>.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">note</span><span aria-hidden="true">'</span> to see note IDs.</p>
        </div>
      </div>`,
    );
  }

  const [removed] = notes.splice(idx, 1);
  saveNotes(notes);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ Note deleted</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Removed  </span>  <span class="text-text-clr opacity-sep">${removed.text}</span></p>
      </div>
    </div>`,
  );
};

const editNote = (shortId: string, newText: string) => {
  if (!shortId || !newText.trim()) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Usage: <span class="text-tertiary-clr font-bold">note edit &lt;id&gt; &lt;new text&gt;</span></p>
      </div>`,
    );
  }

  const notes = getNotes();
  const note = notes.find((n) => n.shortId === shortId);

  if (!note) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> No note found with ID <span class="text-tertiary-clr">"${shortId}"</span>.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">note</span><span aria-hidden="true">'</span> to see note IDs.</p>
        </div>
      </div>`,
    );
  }

  const oldText = note.text;
  note.text = newText.trim();
  note.updatedAt = new Date().toISOString();
  saveNotes(notes);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ Note updated</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Before  </span>  <span class="text-text-clr opacity-sep">${oldText}</span></p>
        <p><span class="text-secondary-clr">After   </span>  ${note.text}</p>
      </div>
    </div>`,
  );
};

const clearNotes = () => {
  storageRemove(NOTES_KEY);
  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ All notes deleted</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">note add &lt;text&gt;</span><span aria-hidden="true">'</span> to start fresh.</p>
      </div>
    </div>`,
  );
};

const showNoteHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">note — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr font-bold">note                       </span> - List all notes</p>
        <p><span class="text-tertiary-clr font-bold">note add &lt;text&gt;            </span> - Add a new note (spaces allowed)</p>
        <p><span class="text-tertiary-clr font-bold">note rm &lt;id&gt;               </span> - Delete a note by its short ID</p>
        <p><span class="text-tertiary-clr font-bold">note edit &lt;id&gt; &lt;text&gt;     </span> - Update note text</p>
        <p><span class="text-tertiary-clr font-bold">note clear                 </span> - Delete all notes</p>
        <p><span class="text-tertiary-clr font-bold">note help                  </span> - Show this guide</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Notes persist in your browser across sessions.</p>
      </div>
    </div>`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleNoteCommand = (args: string[]) => {
  const sub = args[0]?.toLowerCase();

  if (!sub || sub === "list") return listNotes();
  if (sub === "help") return showNoteHelp();
  if (sub === "clear") return clearNotes();

  if (sub === "add") return addNote(args.slice(1).join(" "));

  if (sub === "rm" || sub === "remove" || sub === "delete") {
    return removeNote(args[1]?.toLowerCase() ?? "");
  }

  if (sub === "edit" || sub === "update") {
    return editNote(args[1]?.toLowerCase() ?? "", args.slice(2).join(" "));
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span></p>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">note help</span><span aria-hidden="true">'</span> for all commands.</p>
      </div>
    </div>`,
  );
};
