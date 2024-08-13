//add function to update the tasks list
function readTasks(projectID) {
  const projects = JSON.parse(localStorage.getItem("projects"));

  return projects;
}

export { readTasks };
