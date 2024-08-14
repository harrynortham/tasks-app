import { createProject } from "./projects";
import { createTask } from "./tasks";
export default function renderDefaultContent() {
  if (localStorage.getItem("projects") === null) {
    const projectName = "My First Project";
    const taskName = "Buy Milk";
    let project = createProject(projectName);
    createTask(project, taskName);
  }

  return console.log("default content");
}
