"use server";

import sql from "~/db/client";
import { revalidatePath } from "next/cache";

export type Todo = {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
};

async function getTodos(): Promise<Todo[]> {
  const rows =
    await sql`SELECT id, title, description, is_completed, created_at FROM todos ORDER BY created_at DESC`;
  return rows as unknown as Todo[];
}

export default async function DemoPage() {
  async function addTodo(formData: FormData) {
    "use server";
    const title = String(formData.get("title") ?? "").trim();
    const description =
      String(formData.get("description") ?? "").trim() || null;
    if (!title) return;
    await sql`INSERT INTO todos (title, description) VALUES (${title}, ${description})`;
    revalidatePath("/demo");
  }

  async function toggleTodo(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (!id) return;
    await sql`UPDATE todos SET is_completed = NOT is_completed WHERE id = ${id}`;
    revalidatePath("/demo");
  }

  async function deleteTodo(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    if (!id) return;
    await sql`DELETE FROM todos WHERE id = ${id}`;
    revalidatePath("/demo");
  }

  const todos = await getTodos();

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Todos</h1>

      <form action={addTodo} className="grid gap-2">
        <input
          name="title"
          placeholder="What needs to be done?"
          className="border rounded px-3 py-2"
          required
        />
        <textarea
          name="description"
          placeholder="Optional description"
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="border rounded px-3 py-2 hover:bg-black/[.05] dark:hover:bg-white/[.06]"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-start justify-between gap-3 border rounded p-3"
          >
            <div>
              <div className="font-medium flex items-center gap-2">
                <input
                  defaultChecked={t.is_completed}
                  aria-label="toggle"
                  type="checkbox"
                  readOnly
                  className="pointer-events-none opacity-50"
                />
                <span
                  className={t.is_completed ? "line-through opacity-60" : ""}
                >
                  {t.title}
                </span>
              </div>
              {t.description ? (
                <p className="text-sm opacity-80 mt-1">{t.description}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <form action={toggleTodo}>
                <input type="hidden" name="id" value={t.id} />
                <button className="text-sm border rounded px-2 py-1 hover:bg-black/[.05] dark:hover:bg-white/[.06]">
                  {t.is_completed ? "Undo" : "Done"}
                </button>
              </form>
              <form action={deleteTodo}>
                <input type="hidden" name="id" value={t.id} />
                <button className="text-sm border rounded px-2 py-1 hover:bg-black/[.05] dark:hover:bg-white/[.06]">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
