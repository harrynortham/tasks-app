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

function readTask(taskID) {
  const projects = JSON.parse(localStorage.getItem("projects"));

  // Iterate through all projects to find the task with the matching taskID
  for (const project of projects) {
    const task = project.tasks.find((task) => task.id === taskID);
    if (task) {
      return task; // Return the task if found
    }
  }

  return null; // Return null if no task with the matching taskID is found in any project
}

function deleteTask(taskID) {
  //get the project based on the project ID
  let projects = JSON.parse(localStorage.getItem("projects"));

  // Loop through each project
  projects = projects.map((project) => {
    return {
      // spread operator returns all other properties in the project object
      ...project,
      // we then filter the tasks removing the tasks we dont want
      tasks: project.tasks.filter((task) => task.id !== taskID),
    };
  });

  localStorage.setItem("projects", JSON.stringify(projects));
}

export { readTasks, createTask, deleteTask, readTask };
