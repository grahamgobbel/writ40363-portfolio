// tasks.js - Task CRUD operations and localStorage management

// Initialize tasks array from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Generate unique ID for tasks
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a new task
function createTask(taskData) {
    const newTask = {
        id: generateId(),
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        notifyBefore: taskData.notifyBefore,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks();
    return newTask;
}

// Get all tasks
function getAllTasks() {
    return tasks;
}

// Get task by ID
function getTaskById(id) {
    return tasks.find(task => task.id === id);
}

// Update a task
function updateTask(id, updates) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        saveTasks();
        return tasks[taskIndex];
    }
    return null;
}

// Delete a task
function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasks();
        return true;
    }
    return false;
}

// Toggle task completion
function toggleTaskComplete(id) {
    const task = getTaskById(id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        return task;
    }
    return null;
}

// Get tasks sorted by due date
function getTasksSortedByDate() {
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Get incomplete tasks
function getIncompleteTasks() {
    return tasks.filter(task => !task.completed);
}
