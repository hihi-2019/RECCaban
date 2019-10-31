const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const database = require("knex")(config);

function getAllProjects(db = database) {
  return db("projects").select();
}

function getProject(projectId, db = database) {
  return db("projects")
    .where("projectId", projectId)
    .first();
}

function getTasksForProject(projectId, db = database) {
  return db("projects")
    .where("projectId", projectId)
    .join("tasks", "projects.projectId", "project_id")
    .select();
}

function addTask(task, db = database){
    return db('tasks').insert(task)
}

function updateTask(id, status, task, db = database){
    return db('tasks')
        .where("taskId", id)
        .update({task_status: status, task: task})
        
}

function deleteTask(id, db = database){
    return db('tasks')
    .where('taskId', id).delete()
}


    


module.exports = {
  getAllProjects,
  getProject,
  getTasksForProject,
  addTask,
  updateTask,
  deleteTask
};
