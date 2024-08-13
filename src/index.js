import { renderProjects } from "./renderProjects";

function init() {
  const container = document.getElementById("container");
  container.appendChild(renderProjects());
}

init();
