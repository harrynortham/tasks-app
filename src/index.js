import { renderProjects } from "./renderProjects";
import renderDefaultContent from "./renderDefaultContent";
import "./styles.css";

function init() {
  //create default project if nothing exists
  renderDefaultContent();
  const container = document.getElementById("container");
  container.appendChild(renderProjects());
}

init();
