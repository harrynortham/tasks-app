import { readTasks, createTask } from "./tasks";
import modal from "./renderModal.js";

// add a function or module to show a dialog with the create project/task forms

function newTaskForm(projectID) {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
    <form>
      <h2>New Task</h2>
      <div><input type="text" name="name" required placeholder="Task name"></div>
      <button type="submit">New task</button>
    </form>
  `;

  const form = formContainer.querySelector("form");
  const nameInput = form.querySelector("input[name='name']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = nameInput.value;

    // handle submit
    createTask(projectID, taskName);

    // ADD FUNCTION TO UPDATE TASK LISTS VIEW WHEN CREATED
    // user remove() to reset the values
    nameInput.value = "";
    document.querySelector(".modal").remove();
  });

  return form;
}

function newTaskButton(projectID) {
  const button = document.createElement("button");
  button.classList.add("new-task-button");
  button.innerHTML = "<i class='fa-solid fa-pen-to-square'></i> New Task";

  button.addEventListener("click", () => {
    // open the new project form in a modal
    modal(newTaskForm(projectID)); //expects node element
  });

  return button;
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
  tasksContainer.appendChild(newTaskButton(projectID));

  return tasksContainer;
}

export { renderTasks };
