import { v4 as uuidv4 } from "uuid";

// task factory function goes here
function task(title = "", description = "", dueDate = "", priority = "") {
  return {
    id: uuidv4(),
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
}

function createTask(
  projectID,
  taskName,
  taskDescription,
  taskDueDate,
  taskPriority
) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  const newTask = task(taskName, taskDescription, taskDueDate, taskPriority);

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

function readTask(projectID, taskID) {
  const projects = JSON.parse(localStorage.getItem("projects"));

  // Find the project with the matching projectID
  const project = projects.find((project) => project.id === projectID);
  if (!project) return null; // Return null if no matching project is found

  // Find the task with the matching taskID within the selected project
  const task = project.tasks.find((task) => task.id === taskID);

  return task || null; // Return the task if found, otherwise return null
}

function deleteTask(projectID, taskID) {
  //get the project based on the project ID

  //find the task with the task ID

  //filter and push again the object without this task
  console.log("delete task from local storage");
}

export { readTasks, createTask, deleteTask, readTask };
