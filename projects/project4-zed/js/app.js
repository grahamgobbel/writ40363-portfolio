// app.js - Main application logic and event handlers

let currentFilter = 'all';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    console.log('Task Manager App Initialized');
    
    // Request notification permission
    requestNotificationPermission();
    
    // Render initial views
    renderTaskList();
    renderCalendar();
    renderCountdowns();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start countdown updates
    startCountdownUpdates();
    
    // Check for notifications every minute
    setInterval(checkNotifications, 60000);
}

// Set up all event listeners
function setupEventListeners() {
    // Task form submission
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskSubmit);
    }
    
    // Calendar navigation
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            previousMonth();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            nextMonth();
        });
    }
    
    // Task filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Update current filter
            currentFilter = e.target.dataset.filter;
            // Re-render task list
            renderTaskList();
        });
    });
}

// Handle task form submission
function handleTaskSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const taskData = {
        title: formData.get('taskTitle'),
        description: formData.get('taskDescription'),
        dueDate: formData.get('taskDueDate'),
        priority: formData.get('taskPriority'),
        notifyBefore: parseInt(formData.get('notifyBefore')) || 60
    };
    
    // Create task
    createTask(taskData);
    
    // Reset form
    event.target.reset();
    
    // Re-render views
    renderTaskList();
    renderCalendar();
    renderCountdowns();
}

// Render the task list
function renderTaskList() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    // Clear previous list
    taskList.innerHTML = '';
    
    // Get all tasks sorted by date
    let sortedTasks = getTasksSortedByDate();
    
    // Apply filter
    if (currentFilter === 'active') {
        sortedTasks = sortedTasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        sortedTasks = sortedTasks.filter(task => task.completed);
    }
    
    if (sortedTasks.length === 0) {
        taskList.innerHTML = '<p class="no-tasks">No tasks found</p>';
        return;
    }
    
    // Create task cards
    sortedTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        taskCard.dataset.taskId = task.id;
        
        taskCard.innerHTML = `
            <div class="task-card-header">
                <h3>${task.title}</h3>
                <span class="priority-badge">${task.priority}</span>
            </div>
            <p class="task-description">${task.description || 'No description'}</p>
            <p class="task-due-date">Due: ${new Date(task.dueDate).toLocaleString()}</p>
            <div class="task-actions">
                <button class="btn btn-complete" onclick="handleToggleComplete('${task.id}')">
                    ${task.completed ? '↻ Reopen' : '✓ Complete'}
                </button>
                <button class="btn btn-delete" onclick="handleDeleteTask('${task.id}')">✕ Delete</button>
            </div>
        `;
        
        taskList.appendChild(taskCard);
    });
}

// Handle task completion toggle
function handleToggleComplete(taskId) {
    toggleTaskComplete(taskId);
    renderTaskList();
    renderCalendar();
    renderCountdowns();
}

// Handle task deletion
function handleDeleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(taskId);
        renderTaskList();
        renderCalendar();
        renderCountdowns();
    }
}
