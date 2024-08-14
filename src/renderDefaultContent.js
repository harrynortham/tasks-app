import { createProject } from "./projects";
import { createTask } from "./tasks";
export default function renderDefaultContent() {
  if (localStorage.getItem("projects") === null) {
    const projectName = "My First Project";
    const taskName = "Buy Milk";
    const taskDescription = "Go to the shop and get milk";
    const taskDueDate = "2025-01-01";
    const taskPriority = "low";
    let project = createProject(projectName);
    createTask(project, taskName, taskDescription, taskDueDate, taskPriority);
  }
}
