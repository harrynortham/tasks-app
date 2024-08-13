import { readTasks } from "./tasks";

function newTaskForm() {
  const form = document.createElement("div");
  form.textContent = "task form";
  return form;
}

function tasksList(projectID) {
  const list = readTasks(projectID);
  return list;
}

function renderTasks(projectID) {
  const tasksContainer = document.createElement("div");
  tasksContainer.appendChild(newTaskForm());

  return tasksContainer;
}

export { renderTasks };
