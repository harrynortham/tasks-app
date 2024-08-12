import { v4 as uuidv4 } from "uuid";
function project(title) {
  return {
    id: uuidv4(),
    title,
    todos: [],
  };
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

function createProject(projectName) {
  if (localStorage.getItem("projects") === null) {
    localStorage.setItem("projects", JSON.stringify([]));
  }
  let projects = JSON.parse(localStorage.getItem("projects"));
  const newProject = project(projectName);
  console.log(newProject);
  projects.push(newProject);
  console.log(projects);
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getProjects() {
  return JSON.parse(localStorage.getItem("projects"));
}

export { createProject, getProjects, deleteProject };
