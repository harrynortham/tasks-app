import { createProject, getProjects, deleteProject } from "./projects";

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
    updateProjectsList();
    nameInput.value = "";
  });
  return form;
}

function projectsList() {
  const projects = getProjects();
  const list = document.createElement("ul");
  list.classList.add("projects-list");

  if (projects) {
    projects.forEach((project) => {
      const listItem = document.createElement("li");
      const listItemContent = document.createTextNode(project.title);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", () => {
        //delete the project via its UUID and update the list
        deleteProject(project.id);
        updateProjectsList();
      });

      listItem.appendChild(listItemContent);
      listItem.appendChild(deleteButton);

      list.appendChild(listItem);
    });
  }

  // return list of projects
  return list;
}

function updateProjectsList() {
  const projectsContainer = document.getElementsByClassName("projects")[0];
  projectsContainer.innerHTML = "";
  projectsContainer.appendChild(projectsList());
}

export default function renderProjects() {
  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projects-container");

  const projects = document.createElement("div");
  projects.classList.add("projects");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  projects.appendChild(projectsList());
  actions.appendChild(addProjectForm());

  projectsContainer.appendChild(projects);
  projectsContainer.appendChild(actions);

  // return node containing our elements
  return projectsContainer;
}
