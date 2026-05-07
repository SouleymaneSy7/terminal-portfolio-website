/**
 * In-terminal todo list manager with full CRUD.
 * Data persists in localStorage under "terminal:todos".
 */

import { TODOS_HELP } from "@/constants/help/utils";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { TodoItemType } from "@/types";
import { parseArgs } from "@/utils/argParser";
import { storageGet, storageRemove, storageSet } from "@/utils/commandStorage";
import { generateShortId } from "@/utils/id";
import { DESIGN_TOKENS as DT } from "@/utils/designTokens";
import { createErrorOutput, createHtmlOutput, createSuccessOutput } from "@/utils/output";

const TODOS_KEY = STORAGE_KEYS.TODOS;

const getTodos = (): TodoItemType[] => storageGet<TodoItemType[]>(TODOS_KEY, []);
const saveTodos = (todos: TodoItemType[]): boolean => storageSet(TODOS_KEY, todos);

// ─────────────────────────────────────────────────────────────────
// HANDLERS
// ─────────────────────────────────────────────────────────────────

const listTodos = () => {
  const todos = getTodos();

  if (todos.length === 0) {
    return createHtmlOutput(
      `<div class="space-y-t-section py-t-outer">
        <div class="space-y-t-group">
          <p class="text-secondary-clr font-bold">Todo List</p>
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Your list is empty. 🎉</p>
        </div>
        <div class="space-y-t-footer">
          <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
          <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">todo add &lt;text&gt;</span>${DT.decorators.quote} to create a task.</p>
        </div>
      </div>`,
    );
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  const rows = todos
    .map((t, i) => {
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
    })
    .join("\n");

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-secondary-clr font-bold">
          Todo List
          <span class="text-text-clr opacity-sep">— ${pending.length} pending · ${done.length} done</span>
        </p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        ${rows}
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Use <span class="text-tertiary-clr font-bold">todo done &lt;id&gt;</span> to mark complete · <span class="text-tertiary-clr font-bold">todo rm &lt;id&gt;</span> to delete</p>
      </div>
    </div>`,
  );
};

const addTodo = (text: string) => {
  if (!text.trim()) {
    return createErrorOutput(
      "Task text cannot be empty.",
      `<span class="text-secondary-clr">Usage:</span> <span class="text-tertiary-clr font-bold">todo add &lt;task description&gt;</span>`,
    );
  }

  const id = crypto.randomUUID();
  const item: TodoItemType = {
    id,
    shortId: generateShortId(),
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
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Task added</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">ID    </span>  <span class="text-tertiary-clr">${item.shortId}</span></p>
        <p><span class="text-secondary-clr">Task  </span>  ${item.text}</p>
      </div>
      <div class="space-y-t-footer">
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">todo</span>${DT.decorators.quote} to view your list.</p>
      </div>
    </div>`,
  );
};

const setDone = (shortId: string, done: boolean) => {
  const subCmd = done ? "done" : "undone";

  if (!shortId) {
    return createErrorOutput(
      `Usage: <span class="text-tertiary-clr font-bold">todo ${subCmd} &lt;id&gt;</span>`,
    );
  }

  const todos = getTodos();
  const item = todos.find((t) => t.shortId === shortId);

  if (!item) {
    return createErrorOutput(
      `No task found with ID <span class="text-tertiary-clr">"${shortId}"</span>.`,
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">todo</span>${DT.decorators.quote} to see task IDs.`,
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
        <p class="${statusClass} font-bold">${DT.icons.success} Task ${statusText}</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p>${item.text}</p>
      </div>
    </div>`,
  );
};

const removeTodo = (shortId: string) => {
  if (!shortId) {
    return createErrorOutput(
      `Usage: <span class="text-tertiary-clr font-bold">todo rm &lt;id&gt;</span>`,
    );
  }

  const todos = getTodos();
  const idx = todos.findIndex((t) => t.shortId === shortId);

  if (idx === -1) {
    return createErrorOutput(
      `No task found with ID <span class="text-tertiary-clr">"${shortId}"</span>.`,
      `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">todo</span>${DT.decorators.quote} to see task IDs.`,
    );
  }

  const [removed] = todos.splice(idx, 1);
  saveTodos(todos);

  return createHtmlOutput(
    `<div class="space-y-t-section py-t-outer">
      <div class="space-y-t-group">
        <p class="text-tertiary-clr font-bold">${DT.icons.success} Task deleted</p>
        <p class="text-text-clr opacity-sep" aria-hidden="true">${DT.separators.short}</p>
        <p><span class="text-secondary-clr">Removed  </span>  <span class="text-text-clr opacity-sep">${removed.text}</span></p>
      </div>
    </div>`,
  );
};

const clearTodos = () => {
  storageRemove(TODOS_KEY);
  return createSuccessOutput(
    `All tasks deleted. Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">todo add &lt;text&gt;</span>${DT.decorators.quote} to start fresh.`,
  );
};

const showTodoHelp = () => TODOS_HELP;

// ─────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────

export const handleTodoCommand = (args: string[]) => {
  const parsed = parseArgs(args);
  const sub = parsed.subcommand?.toLowerCase();

  if (parsed.flags.help) return showTodoHelp();
  if (!sub || sub === "list") return listTodos();
  if (sub === "clear") return clearTodos();
  if (sub === "add") return addTodo(parsed.positional.slice(1).join(" "));
  if (sub === "done") return setDone(parsed.positional[1]?.toLowerCase() ?? "", true);
  if (sub === "undone") return setDone(parsed.positional[1]?.toLowerCase() ?? "", false);
  if (sub === "rm" || sub === "remove" || sub === "delete") {
    return removeTodo(parsed.positional[1]?.toLowerCase() ?? "");
  }

  return createErrorOutput(
    `Unknown subcommand: <span class="text-tertiary-clr">"${args[0]}"</span>`,
    `Type ${DT.decorators.quote}<span class="text-tertiary-clr font-bold">todo help</span>${DT.decorators.quote} for all commands.`,
  );
};
