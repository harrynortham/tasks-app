import { readTasks, createTask } from "./tasks";
import modal from "./renderModal";

function newTaskForm(projectID) {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
    <form>
      <h2>New Task</h2>
      <div><input type="text" name="name" required placeholder="Task name"></div>
 <div><textarea type="text" name="description" required placeholder="Description"></textarea></div>
<div><input type="date" name="duedate" placeholder="Due date"></div>
<div>
<select>
  <option>Priority</option>
</select>
</div>
      <button type="submit">New task</button>
    </form>
  `;

  const form = formContainer.querySelector("form");
  const nameInput = form.querySelector("input[name='name']");
  const descriptionInput = form.querySelector("textarea[name='description']");
  const duedateInput = form.querySelector("input[name='duedate']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = nameInput.value;
    console.log(duedateInput.value);
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
