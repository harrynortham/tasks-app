import { readTasks, createTask } from "./tasks";
import modal from "./renderModal";
import { format } from "date-fns";

function newTaskForm(projectID) {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
    <form>
      <h2>New Task</h2>
      <div><input type="text" name="name" required placeholder="Task name"></div>
 <div><textarea type="text" name="description" required placeholder="Description"></textarea></div>
<div><input type="date" name="duedate" placeholder="Due date"></div>
<div>
<select name="priority">
<option value="" disabled selected>Priority</option>
<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>
</div>
      <button type="submit">Add</button>
    </form>
  `;

  const form = formContainer.querySelector("form");
  const taskName = form.querySelector("input[name='name']");
  const taskDescription = form.querySelector("textarea[name='description']");
  const taskDueDate = form.querySelector("input[name='duedate']");
  const taskPriority = form.querySelector("select[name='priority']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // handle submit
    createTask(
      projectID,
      taskName.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value
    );

    // ADD FUNCTION TO UPDATE TASK LISTS VIEW WHEN CREATED
    refreshTasks(projectID);

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

  const tasksList = document.createElement("div");
  tasksList.classList.add("tasks-list");

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.setAttribute("data-task-id", task.id);
    const taskDueDate = format(new Date(task.dueDate), "Mo MMM");
    taskItem.innerHTML = `<div><div class="task-description">${task.title}</div><div><span class="task-priority-${task.priority}"></span><span>${taskDueDate}</span></div></div><div><div><button class="view-task"><i class="fa-regular fa-eye"></i></button> <button class="delete-task"><i class="fa-solid fa-xmark"></button></i></div>
</div>`;

    tasksList.appendChild(taskItem);
  });
  return tasksList;
}

function refreshTasks(projectID) {
  const project = document.querySelector(`[data-project-id="${projectID}"]`);
  const tasks = project.querySelector(".tasks");
  tasks.innerHTML = "";
  tasks.appendChild(tasksList(projectID));
}

function renderTasks(projectID) {
  const tasks = document.createElement("div");
  tasks.classList.add("tasks");
  tasks.appendChild(tasksList(projectID));
  tasks.appendChild(newTaskButton(projectID));

  return tasks;
}

export { renderTasks };
