function project(title) {
  return {
    title,
    todos: [],
  };
}

function createProject(projectName) {
  const newProject = project(projectName);
  console.log(newProject);
}

function getProjects() {
  return "The projects";
}

export { createProject, getProjects };
