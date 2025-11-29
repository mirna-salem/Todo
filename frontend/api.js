import { BASE_URL } from './config.js';

export async function getTodos() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
}

export async function createTodo(todo) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  });

  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(id, updates) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });

    if (!res.ok) {
        throw new Error("Failed to update todo");
    }

    return res.json();
}