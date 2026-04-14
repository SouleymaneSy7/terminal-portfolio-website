/**
 * In-terminal todo list manager with full CRUD.
 * Data persists in localStorage under "terminal:todos".
 *
 */

import { createHtmlOutput } from "@/constants";
import { TodoItemType } from "@/types";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";

const TODOS_KEY = "terminal:todos";

const getTodos = (): TodoItemType[] =>
  storageGet<TodoItemType[]>(TODOS_KEY, []);
const saveTodos = (todos: TodoItemType[]): boolean =>
  storageSet(TODOS_KEY, todos);
const makeShortId = (uuid: string): string =>
  uuid.replace(/-/g, "").slice(0, 6);

const listTodos = () => {
  const todos = getTodos();

  if (todos.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Todo List</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Your list is empty. 🎉</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">todo add &lt;text&gt;</span><span aria-hidden="true">'</span> to create a task.</p>
        </div>
      </div>`,
    );
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  const renderRow = (t: TodoItemType, i: number) => {
    const statusIcon = t.done
      ? `<span class="text-tertiary-clr font-bold">✓</span>`
      : `<span class="text-text-clr opacity-sep">○</span>`;
    const textClass = t.done ? "text-text-clr opacity-sep" : "text-text-clr";
    return `<p>
      <span class="text-primary-clr font-bold">${String(i + 1).padStart(2, "0")}</span>
      <span>  ${statusIcon}  </span>
      <span class="text-text-clr opacity-sep">[</span><span class="text-tertiary-clr">${t.shortId}</span><span class="text-text-clr opacity-sep">]</span>
      <span class="${textClass}">  ${t.text}</span>
    </p>`;
  };

  const allRows = todos.map((t, i) => renderRow(t, i)).join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">
          Todo List
          <span class="text-text-clr opacity-sep">
            — ${pending.length} pending · ${done.length} done
          </span>
        </p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        ${allRows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Use <span class="text-tertiary-clr font-bold">todo done &lt;id&gt;</span> to mark complete · <span class="text-tertiary-clr font-bold">todo rm &lt;id&gt;</span> to delete</p>
      </div>
    </div>`,
  );
};

const addTodo = (text: string) => {
  if (!text.trim()) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Task text cannot be empty.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Usage: <span class="text-tertiary-clr font-bold">todo add &lt;task description&gt;</span></p>
        </div>
      </div>`,
    );
  }

  const id = crypto.randomUUID();
  const item: TodoItemType = {
    id,
    shortId: makeShortId(id),
    text: text.trim(),
    done: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };

  const todos = getTodos();
  todos.push(item);
  saveTodos(todos);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ Task added</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">ID    </span>  <span class="text-tertiary-clr">${item.shortId}</span></p>
        <p><span class="text-secondary-clr">Task  </span>  ${item.text}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">todo</span><span aria-hidden="true">'</span> to view your list.</p>
      </div>
    </div>`,
  );
};

const setDone = (shortId: string, done: boolean) => {
  if (!shortId) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Usage: <span class="text-tertiary-clr font-bold">todo ${done ? "done" : "undone"} &lt;id&gt;</span></p>
      </div>`,
    );
  }

  const todos = getTodos();
  const item = todos.find((t) => t.shortId === shortId);

  if (!item) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> No task found with ID <span class="text-tertiary-clr">"${shortId}"</span>.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">todo</span><span aria-hidden="true">'</span> to see task IDs.</p>
        </div>
      </div>`,
    );
  }

  item.done = done;
  item.completedAt = done ? new Date().toISOString() : null;
  saveTodos(todos);

  const statusText = done ? "marked as done ✓" : "marked as pending ○";
  const statusClass = done ? "text-tertiary-clr" : "text-primary-clr";

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="${statusClass} font-bold">✓ Task ${statusText}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>${item.text}</p>
      </div>
    </div>`,
  );
};

const removeTodo = (shortId: string) => {
  if (!shortId) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Usage: <span class="text-tertiary-clr font-bold">todo rm &lt;id&gt;</span></p>
      </div>`,
    );
  }

  const todos = getTodos();
  const idx = todos.findIndex((t) => t.shortId === shortId);

  if (idx === -1) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> No task found with ID <span class="text-tertiary-clr">"${shortId}"</span>.</p>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
          <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">todo</span><span aria-hidden="true">'</span> to see task IDs.</p>
        </div>
      </div>`,
    );
  }

  const [removed] = todos.splice(idx, 1);
  saveTodos(todos);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ Task deleted</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-secondary-clr">Removed  </span>  <span class="text-text-clr opacity-sep">${removed.text}</span></p>
      </div>
    </div>`,
  );
};

const clearTodos = () => {
  storageRemove(TODOS_KEY);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">✓ All tasks deleted</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">todo add &lt;text&gt;</span><span aria-hidden="true">'</span> to start fresh.</p>
      </div>
    </div>`,
  );
};

const showTodoHelp = () =>
  createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">todo — Command Reference</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p><span class="text-tertiary-clr font-bold">todo                       </span> - List all tasks</p>
        <p><span class="text-tertiary-clr font-bold">todo add &lt;text&gt;            </span> - Add a new task</p>
        <p><span class="text-tertiary-clr font-bold">todo done &lt;id&gt;             </span> - Mark task as completed</p>
        <p><span class="text-tertiary-clr font-bold">todo undone &lt;id&gt;           </span> - Mark task as pending</p>
        <p><span class="text-tertiary-clr font-bold">todo rm &lt;id&gt;               </span> - Delete a task</p>
        <p><span class="text-tertiary-clr font-bold">todo clear                 </span> - Delete all tasks</p>
        <p><span class="text-tertiary-clr font-bold">todo help                  </span> - Show this guide</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Tasks persist in your browser across sessions.</p>
      </div>
    </div>`,
  );

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleTodoCommand = (args: string[]) => {
  const sub = args[0]?.toLowerCase();

  if (!sub || sub === "list") return listTodos();
  if (sub === "help") return showTodoHelp();
  if (sub === "clear") return clearTodos();
  if (sub === "add") return addTodo(args.slice(1).join(" "));
  if (sub === "done") return setDone(args[1]?.toLowerCase() ?? "", true);
  if (sub === "undone") return setDone(args[1]?.toLowerCase() ?? "", false);
  if (sub === "rm" || sub === "remove" || sub === "delete") {
    return removeTodo(args[1]?.toLowerCase() ?? "");
  }

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <p><span aria-hidden="true" class="text-secondary-clr">⚠</span> Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span></p>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">────────────────────────────────────────</p>
        <p>Type <span aria-hidden="true">'</span><span class="text-tertiary-clr font-bold">todo help</span><span aria-hidden="true">'</span> for all commands.</p>
      </div>
    </div>`,
  );
};
