#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PATH = path.join(process.cwd(), 'tasks.json');

const [,, command, ...args] = process.argv;
switch (command) {
    case 'add':
        addTask(args[0]);
        break;
    case 'update':
        updateTask(args[0], args[1]);
        break;
    case 'delete':
        deleteTask(args[0]);
        break;
    case 'mark':
        markTask(args[0], args[1]);
        break;
    case 'list':
        listTasks(args[0]);
        break;
    default:
        console.error('Unknown command. Available commands: add, update, delete, mark, list');
        process.exit(1);
}

function loadTasks() {
    if (!fs.existsSync(PATH)) {
        return [];
    }
    const data = fs.readFileSync(PATH, 'utf-8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(PATH, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    const tasks = loadTasks();
    const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const now = new Date().toISOString();

    tasks.push({
        id,
        description,
        status: 'todo',
        createdAt: now,
        updatedAt: now,
    });

    saveTasks(tasks);
    console.log(`Task added with ID: ${id}`);
}

function updateTask(id, description) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if(!task) return console.error(`Task with ID ${id} not found.`);

    task.description = description;
    task.updatedAt = new Date().toISOString();

    saveTasks(tasks);
    console.log(`Task with ID ${id} updated.`);
}

function deleteTask(id) {
    let tasks = loadTasks();
    const exists = tasks.find(t => t.id === parseInt(id));
    if(!exists) return console.error(`Task with ID ${id} not found.`);

    tasks = tasks.filter(t => t.id !== parseInt(id));
    saveTasks(tasks);
    console.log(`Task with ID ${id} deleted.`);
}


function markTask(id, status) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if(!task) return console.error(`Task with ID ${id} not found.`);

    task.status = status;
    task.updatedAt = new Date().toISOString();

    saveTasks(tasks);
    console.log(`Task with ID ${id} marked as ${status}.`);
}

function listTasks(filter) {
    const tasks = loadTasks();
    const filteredTasks = filter ? tasks.filter(t => t.status === filter) : tasks;
    filteredTasks.forEach(task => {
        console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`);
    });
}
