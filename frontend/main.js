import { getTodos, createTodo, updateTodo, deleteTodo } from "./api.js";

const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const todos = await getTodos();
        todos.forEach((todo) => {
            addTaskToDOM(todo);
        });
    } catch (err) {
        console.error(err);
    }
});

button.addEventListener("click", () => {
    handleAddTask();
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleAddTask();
    }
});

async function handleAddTask() {
    const taskText = input.value.trim();

    if (!taskText) {
        return;
    }

    const newTodo = {
        task: taskText,
        isCompleted: false
    };

    try {
        const savedTodo = await createTodo(newTodo);
        addTaskToDOM(savedTodo);
        input.value = "";
    } catch (err) {
        console.error(err);
        alert("Failed to add task");
    }
}

function addTaskToDOM(todo) {
    const li = document.createElement("li");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;

    const span = document.createElement("span");
    span.textContent = todo.task;

    label.appendChild(checkbox);
    label.appendChild(span);
    
    li.appendChild(label);

    // Create delete button (garbage can)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑"; // Unicode trash can icon
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    list.appendChild(li);

    // Add event listerner for checkbox to handle completion status change
    checkbox.addEventListener("change", async () => {
        try 
        {
            await updateTodo(todo.id, { isCompleted: checkbox.checked });
            todo.isCompleted = checkbox.checked;

        } catch (err) 
        {
            console.error(err);
            alert("Failed to update task");
        }
    });

    // Event listener for delete button
    deleteBtn.addEventListener("click", async () => {
        try {
            await deleteTodo(todo.id);
            li.remove(); // remove from DOM
        } catch (err) {
            console.error(err);
            alert("Failed to delete task");
        }
    });
}
