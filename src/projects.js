import { v4 as uuidv4 } from "uuid";

function project(title) {
  return {
    id: uuidv4(),
    title,
    tasks: [],
  };
}

function createProject(projectName) {
  // this can be refactored to use logical operator OR
  if (localStorage.getItem("projects") === null) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
  let projects = JSON.parse(localStorage.getItem("projects"));

  const newProject = project(projectName);
  projects.push(newProject);

  localStorage.setItem("projects", JSON.stringify(projects));
}

function readProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

function deleteProject(projectID) {
  let projects = JSON.parse(localStorage.getItem("projects"));
  //filter array removing the deleted project
  const projectsFiltered = projects.filter((project) => {
    return project.id !== projectID;
  });

  //set storage with the updated array of objects
  localStorage.setItem("projects", JSON.stringify(projectsFiltered));
}

export { createProject, readProjects, deleteProject };
