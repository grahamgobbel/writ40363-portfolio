// countdown.js - Countdown timer functionality

// Calculate time remaining until a date
function getTimeRemaining(dueDate) {
    const now = new Date().getTime();
    const due = new Date(dueDate).getTime();
    const difference = due - now;
    
    if (difference <= 0) {
        return {
            expired: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    
    return {
        expired: false,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
}

// Format time remaining as string
function formatTimeRemaining(timeObj) {
    if (timeObj.expired) {
        return 'Expired';
    }
    
    const parts = [];
    if (timeObj.days > 0) parts.push(`${timeObj.days}d`);
    if (timeObj.hours > 0) parts.push(`${timeObj.hours}h`);
    if (timeObj.minutes > 0) parts.push(`${timeObj.minutes}m`);
    if (timeObj.seconds > 0 || parts.length === 0) parts.push(`${timeObj.seconds}s`);
    
    return parts.join(' ');
}

// Render countdown timers for all incomplete tasks
function renderCountdowns() {
    const countdownList = document.getElementById('countdownList');
    if (!countdownList) return;
    
    // Clear previous countdowns
    countdownList.innerHTML = '';
    
    // Get incomplete tasks sorted by due date
    const incompleteTasks = getIncompleteTasks().sort((a, b) => 
        new Date(a.dueDate) - new Date(b.dueDate)
    );
    
    if (incompleteTasks.length === 0) {
        countdownList.innerHTML = '<p class="no-tasks">No upcoming tasks</p>';
        return;
    }
    
    // Create countdown card for each task
    incompleteTasks.forEach(task => {
        const countdownCard = document.createElement('div');
        countdownCard.className = 'countdown-card';
        countdownCard.dataset.taskId = task.id;
        
        const timeRemaining = getTimeRemaining(task.dueDate);
        const priorityClass = `priority-${task.priority}`;
        
        countdownCard.innerHTML = `
            <div class="countdown-header">
                <h3>${task.title}</h3>
                <span class="priority-badge ${priorityClass}">${task.priority}</span>
            </div>
            <div class="countdown-timer ${timeRemaining.expired ? 'expired' : ''}">
                ${formatTimeRemaining(timeRemaining)}
            </div>
            <div class="countdown-date">
                Due: ${new Date(task.dueDate).toLocaleString()}
            </div>
        `;
        
        countdownList.appendChild(countdownCard);
    });
}

// Update all countdowns every second
function startCountdownUpdates() {
    setInterval(() => {
        renderCountdowns();
    }, 1000);
}

// Check if any tasks need notifications
function checkNotifications() {
    const incompleteTasks = getIncompleteTasks();
    const now = new Date().getTime();
    
    incompleteTasks.forEach(task => {
        const dueTime = new Date(task.dueDate).getTime();
        const notifyTime = dueTime - (task.notifyBefore * 60 * 1000);
        
        // Check if we should notify (within a 1-minute window)
        if (now >= notifyTime && now < notifyTime + 60000) {
            showNotification(task);
        }
    });
}

// Show browser notification
function showNotification(task) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Task Reminder', {
            body: `${task.title} is due soon!`,
            icon: 'images/notification-icon.png',
            tag: task.id
        });
    }
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}
