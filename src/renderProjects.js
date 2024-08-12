import { createProject, getProjects } from "./projects";

function addProjectForm() {
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.required = true;
  nameInput.setAttribute("name", "projectname");
  const button = document.createElement("button");
  button.textContent = "Create project";

  form.appendChild(nameInput);
  form.appendChild(button);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = nameInput.value;
    // handle submit
    createProject(projectName);
  });
  return form;
}

function projectsList() {
  const projects = getProjects();
  const projectsList = document.createElement("div");
  const list = document.createTextNode(projects);
  projectsList.appendChild(list);

  // return list of projects
  return projectsList;
}

export default function renderProjects() {
  const projectsContainer = document.createElement("div");

  projectsContainer.appendChild(projectsList());
  projectsContainer.appendChild(addProjectForm());

  // return node containing our elements
  return projectsContainer;
}
