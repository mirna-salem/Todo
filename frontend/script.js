const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const list = document.getElementById("taskList");


button.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		addTask();
	}
});

function addTask() {
	const taskText = input.value;
	if (!taskText) return;

	const li = document.createElement("li");

	// Wrap checkbox and text in a label
	const label = document.createElement("label");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";

	const span = document.createElement("span");
	span.textContent = taskText;

	label.appendChild(checkbox);
	label.appendChild(span);
	li.appendChild(label);

	list.appendChild(li);
	input.value = "";
}


