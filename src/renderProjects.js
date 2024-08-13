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
    projects.reverse();
    projects.forEach((project) => {
      const listItem = document.createElement("li");

      // change to use data attribute instead of ID
      //listItem.id = project.id;
      listItem.setAttribute("data-project-id", project.id);

      const listItemContent = document.createElement("div");
      listItemContent.classList.add("project-title");
      listItemContent.appendChild(document.createTextNode(project.title));

      const deleteButton = document.createElement("span");
      deleteButton.classList.add(
        "delete-project",
        "fa-solid",
        "fa-circle-xmark",
        "fa-lg"
      );

      deleteButton.addEventListener("click", () => {
        deleteProject(project.id);
        // remove the element from dom instead of reloading full list
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
  const project = document.querySelectorAll(
    `[data-project-id="${projectID}"]`
  )[0];
  project.remove();
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

  projectsContainer.appendChild(actions);
  projectsContainer.appendChild(projects);

  // return node containing our elements
  return projectsContainer;
}

export { renderProjects };
