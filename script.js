document.addEventListener("DOMContentLoaded", loadTasks);

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTodoElement(task.text, task.completed));
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText) {
    createTodoElement(taskText);
    saveTaskInLocalStorage(taskText);
    todoInput.value = "";
  }
});

function createTodoElement(taskText, completed = false) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";
  if (completed) todoItem.classList.add("completed");

  const task = document.createElement("span");
  task.className = "task";
  task.textContent = taskText;
  task.onclick = () => toggleComplete(todoItem, taskText);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "🗑️";
  deleteButton.onclick = () => deleteTask(todoItem, taskText);

  todoItem.appendChild(task);
  todoItem.appendChild(deleteButton);
  todoList.appendChild(todoItem);
}

function toggleComplete(todoItem, taskText) {
  todoItem.classList.toggle("completed");
  updateTaskInLocalStorage(taskText, todoItem.classList.contains("completed"));
}

function deleteTask(todoItem, taskText) {
  todoItem.remove();
  removeTaskFromLocalStorage(taskText);
}

function filterTasks(status) {
  const tasks = document.querySelectorAll(".todo-item");
  tasks.forEach(task => {
    const isCompleted = task.classList.contains("completed");
    if (
      (status === "completed" && !isCompleted) ||
      (status === "active" && isCompleted)
    ) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  });
}

function saveTaskInLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find(task => task.text === taskText);
  if (task) task.completed = completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
