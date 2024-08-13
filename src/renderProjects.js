import { createProject, readProjects, deleteProject } from "./projects";
import { renderTasks } from "./renderTasks.js";

function newProjectForm() {
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.required = true;
  nameInput.setAttribute("name", "name");
  const button = document.createElement("button");
  button.textContent = "Create project";

  form.appendChild(nameInput);
  form.appendChild(button);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = nameInput.value;
    // handle submit
    createProject(projectName);
    refreshProjects();
    nameInput.value = "";
  });
  return form;
}

function projectsList() {
  const projects = readProjects();
  const list = document.createElement("ul");
  list.classList.add("projects-list");

  if (projects) {
    projects.forEach((project) => {
      const listItem = document.createElement("li");
      listItem.id = project.id;
      const listItemContent = document.createTextNode(project.title);
      // listItem.appendChild(renderTasks());

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
        // remove the element from dom instead of reloading full list
        deleteProject(project.id);
        removeProject(project.id);
      });

      listItem.appendChild(listItemContent);
      listItem.appendChild(deleteButton);

      const tasks = renderTasks(project.id);
      listItem.appendChild(tasks);

      list.appendChild(listItem);
    });
  }

  // return list of projects
  return list;
}

function removeProject(projectID) {
  const project = document.getElementById(projectID);
  project.remove();
  console.log("Deleted project: " + projectID);
}

function refreshProjects(projectID) {
  const projectsContainer = document.getElementsByClassName("projects")[0];
  projectsContainer.innerHTML = "";
  projectsContainer.appendChild(projectsList());
}

function renderProjects() {
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects-container");

  const projects = document.createElement("div");
  projects.classList.add("projects");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  projects.appendChild(projectsList());
  actions.appendChild(newProjectForm());

  projectsContainer.appendChild(projects);
  projectsContainer.appendChild(actions);

  // return node containing our elements
  return projectsContainer;
}

export { renderProjects };
