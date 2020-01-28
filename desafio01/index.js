const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let access = 0;

//middleware - contar os acessos
server.use((req, res, next) => {
    console.log(`Total de acessos: ${++access}`);
    next();
});

function checkID(req, res, next) {
    const { id } = req.params;
    if (id === undefined) {
        return res.status(400).json({ 'error': 'Missing ID on the url' });
    }
    const project = projects.find((item) => item.id == id);
    if (project === undefined) {
        return res.status(400).json({ 'error': 'Project does not exists' });
    }
    req.project = project
    return next();
}
function checkRequiredFields(req, res, next) {
    const { id, title } = req.body;
    let msg = [];
    if (id === undefined) {
        msg.push('An id must be passed');
    }
    if (title === undefined) {
        msg.push('A title must be passed');
    }

    if (msg.length > 0) {
        return res.status(400).json({ 'error': msg });
    }
    return next();
}

//lista projetos
server.get('/projects', (req, res) => { return res.json(projects); });

//grava projeto
server.post('/projects', checkRequiredFields, (req, res) => {
    const { id } = req.body;
    const project = projects.find(item => item.id == id);

    if (project) {
        return res.status(400).json({ 'error': `Project with id ${id} already exists` });
    }

    projects.push(req.body);
    return res.json(projects);
});


//busca projeto
server.get('/projects/:id', checkID, (req, res) => { return res.json(req.project); });

//atualiza projeto
server.put('/projects/:id', checkID, checkRequiredFields, (req, res) => {
    const { title, tasks } = req.body;
    req.project.title = title;
    if (tasks !== undefined) {
        req.project.tasks = tasks;
    }
    return res.json(projects);
});

//delete projeto
server.delete('/projects/:id', checkID, (req, res) => {
    const { id } = req.params;
    const index = projects.findIndex((item) => item.id == id);
    projects.splice(index, 1);
    return res.send();
});

//add nova task
server.post('/projects/:id/tasks', checkID, (req, res) => {
    const { title } = req.body;
    if (req.project.tasks === undefined)
        req.project.tasks = [];
    req.project.tasks.push(title);
    return res.json(projects);
});

server.listen(3000);