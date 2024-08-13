import { renderProjects } from "./renderProjects";
import "./styles.css";

function init() {
  const container = document.getElementById("container");
  container.appendChild(renderProjects());
}

init();
