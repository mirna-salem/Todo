import { getTodos, createTodo, updateTodo, deleteTodo } from "./api.js";

const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("todo-list");
const template = document.getElementById("todo-template");

// Utility to handle async errors
async function safeAsync(fn, errorMessage) {
    try {
        return await fn();
    } catch (err) {
        console.error(err);
        alert(errorMessage);
    }
}
// Load todos on page load
window.addEventListener("DOMContentLoaded", async () => {
    const todos = await safeAsync(() => getTodos(), "Failed to load tasks") || [];
    todos.forEach(addTaskToDOM);
});

// Handle adding task
async function handleAddTask() {
    const taskText = input.value.trim();
    if (!taskText) return;

    const newTodo = { task: taskText, isCompleted: false };
    const savedTodo = await safeAsync(() => createTodo(newTodo), "Failed to add task");
    if (savedTodo) {
        addTaskToDOM(savedTodo);
        input.value = "";
    }
}

// Event listeners
button.addEventListener("click", handleAddTask);
input.addEventListener("keydown", (e) => e.key === "Enter" && handleAddTask());

// DOM creation
function addTaskToDOM(todo) {
    const li = template.content.firstElementChild.cloneNode(true);
    li.dataset.id = todo.id;

    const checkbox = li.querySelector(".todo-checkbox");
    const span = li.querySelector(".todo-text");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.checked = todo.isCompleted;
    span.textContent = todo.task;

    // Event bindings
    checkbox.addEventListener("change", async () => {
        const updated = await safeAsync(() => updateTodo(todo.id, { isCompleted: checkbox.checked }), "Failed to update task");
        if (updated) {
            todo.isCompleted = checkbox.checked;
            // Move completed tasks to end, uncompleted to start
            if (checkbox.checked) {
                list.appendChild(li);
            } else {
                list.prepend(li);
            }
        }
    });

    deleteBtn.addEventListener("click", async () => {
        const deleted = await safeAsync(() => deleteTodo(todo.id), "Failed to delete task");
        if (deleted !== undefined) li.remove();
    });

    // Add to DOM: completed tasks go to end, new tasks go to start
    if (todo.isCompleted)
        list.appendChild(li);
    else
        list.prepend(li);
}