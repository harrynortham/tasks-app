import { readTasks, createTask } from "./tasks";

// add a function or module to show a dialog with the create project/task forms

function newTaskForm(projectID) {
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.required = true;
  nameInput.setAttribute("name", "name");
  const button = document.createElement("button");
  button.textContent = "New task";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = nameInput.value;

    // handle submit
    createTask(projectID, taskName);

    // ADD FUNCTION TO UPDATE TASK LISTS VIEW WHEN CREATED

    nameInput.value = "";
  });

  form.appendChild(nameInput);
  form.appendChild(button);
  return form;
}

//create list of tasks and return the list and render it
function tasksList(projectID) {
  const tasks = readTasks(projectID);
  const list = document.createElement("ul");
  list.classList.add("tasks-list");

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-task-id", task.id);
    listItem.textContent = task.title;
    list.appendChild(listItem);
    console.log(task);
  });
  return list;
}

function renderTasks(projectID) {
  const tasksContainer = document.createElement("div");
  tasksContainer.appendChild(tasksList(projectID));
  tasksContainer.appendChild(newTaskForm(projectID));

  return tasksContainer;
}

export { renderTasks };
