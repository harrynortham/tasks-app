import { createProject, readProjects, deleteProject } from "./projects";
import { renderTasks } from "./renderTasks";
import modal from "./renderModal";

// use reset() method restores a form element's default values
function newProjectForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <h2>New Project</h2>
    <div><input type="text" name="name" required placeholder="Project name" /></div>
    <button type="submit">Add</button>
  `;

  const nameInput = form.querySelector('input[name="name"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectName = nameInput.value;
    // handle submit
    createProject(projectName);
    refreshProjects();
    nameInput.value = "";
    document.querySelector(".modal").remove();
  });

  return form;
}

function newProjectButton() {
  const button = document.createElement("button");
  button.innerHTML = "<i class='fa-solid fa-list-check'></i> New Project";

  button.addEventListener("click", () => {
    // open the new project form in a modal
    modal(newProjectForm()); //expects node element
  });

  return button;
}

function projectsList() {
  const projects = readProjects();
  const list = document.createElement("ul");
  list.classList.add("projects-list");

  if (projects) {
    projects.reverse();
    projects.forEach((project) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-project-id", project.id);

      const listItemContent = document.createElement("div");
      listItemContent.classList.add("project-title");
      listItemContent.appendChild(document.createTextNode(project.title));

      const deleteButton = document.createElement("span");
      deleteButton.classList.add(
        "delete-project",
        "fa-solid",
        "fa-xmark",
        "fa-xl"
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
  const project = document.querySelector(`[data-project-id="${projectID}"]`);
  project.remove();
}

function refreshProjects(projectID) {
  const projectsContainer = document.querySelector(".projects");
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

  actions.appendChild(newProjectButton());

  projectsContainer.appendChild(actions);
  projectsContainer.appendChild(projects);

  // return node containing our elements
  return projectsContainer;
}

export { renderProjects };
