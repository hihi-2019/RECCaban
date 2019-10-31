const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)

function getAllProjects(db = database){
    return db('projects').select()
}

function getProject(projectId, db = database){
    return db('projects').where('projectId', projectId).first()
}

function getTasksForProject(projectId, db = database){
    return db('projects')
    .where('projectId', projectId)
    .join('tasks', 'projects.projectId', 'project_id').select()
    .then(tasks => {console.log(tasks)})
    
}


module.exports = {
    getAllProjects,
    getProject,
    getTasksForProject
}

1// getProjects(database)
// getProject(2, database)
// getTasksForProject(1, database)