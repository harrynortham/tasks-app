import { v4 as uuidv4 } from "uuid";

//add function to update the tasks list

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
  projects.map((project) => {
    if (project.id === projectID) {
      //console.log(project);
      const tasksArr = project.tasks;
      tasksArr.push(newTask);
      //console.log(tasksArr);
    }
  });
  console.log(projects);
  localStorage.setItem("projects", JSON.stringify(projects));
}

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
