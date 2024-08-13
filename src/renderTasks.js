import { readTasks, createTask } from "./tasks";

function newTaskForm(projectID) {
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.required = true;
  nameInput.setAttribute("name", "name");
  const button = document.createElement("button");
  button.textContent = "Create task";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = nameInput.value;

    // handle submit
    createTask(projectID, taskName);
    nameInput.value = "";
  });

  form.appendChild(nameInput);
  form.appendChild(button);
  return form;
}

//create list of tasks and return the list and render it
function tasksList(projectID) {
  const tasks = readTasks(projectID);
  tasks.forEach((task) => {
    console.log(task);
  });
}

function renderTasks(projectID) {
  const tasksContainer = document.createElement("div");
  tasksList(projectID);
  tasksContainer.appendChild(newTaskForm(projectID));

  return tasksContainer;
}

export { renderTasks };
