import { v4 as uuidv4 } from "uuid";
import { format, compareAsc } from "date-fns";

//we will use date-fns package to order tasks by date

// task factory function goes here
function task(title = "", description = "", dueDate, priority) {
  return {
    id: uuidv4(),
    title,
    description,
    // dueDate,
    // priority,
    completed: false,
  };
}

function createTask(projectID, taskName) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  const newTask = task(taskName);

  // use array.find() to find the project with the project ID
  const project = projects.find((project) => project.id === projectID);

  // if project with ID exists push the task object to the array
  if (project) {
    project.tasks.push(newTask);
  }

  localStorage.setItem("projects", JSON.stringify(projects));
}

// below function should be changed to find instead of map because we want to select a single element
function readTasks(projectID) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  let tasks = "";
  projects.map((project) => {
    if (project.id === projectID) {
      tasks = project.tasks;
    }
  });
  return tasks;
}

export { readTasks, createTask };
