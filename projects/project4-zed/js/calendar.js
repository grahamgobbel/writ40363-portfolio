// calendar.js - Calendar rendering and date management

let currentDate = new Date();
let selectedDate = null;

// Get month name
function getMonthName(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[date.getMonth()];
}

// Get number of days in month
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// Get first day of month (0 = Sunday, 6 = Saturday)
function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Render calendar for current month
function renderCalendar() {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarElement || !currentMonthElement) return;
    
    // Update month display
    currentMonthElement.textContent = `${getMonthName(currentDate)} ${currentDate.getFullYear()}`;
    
    // Clear previous calendar
    calendarElement.innerHTML = '';
    
    // Create calendar grid
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarElement.appendChild(dayHeader);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarElement.appendChild(emptyCell);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Create a date object for this day
        const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        
        // Check if this is today
        if (isSameDay(cellDate, today)) {
            dayCell.classList.add('today');
        }
        
        // Check if this day is selected
        if (selectedDate && isSameDay(cellDate, selectedDate)) {
            dayCell.classList.add('selected');
        }
        
        // Check if this day has any tasks
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const tasksOnThisDay = getTasksForDate(dateString);
        
        if (tasksOnThisDay.length > 0) {
            dayCell.classList.add('has-tasks');
            dayCell.title = `${tasksOnThisDay.length} task(s) on this day`;
        }
        
        // Add click handler to select date
        dayCell.addEventListener('click', () => {
            selectedDate = cellDate;
            renderCalendar();
            displayTasksForSelectedDate(dateString, tasksOnThisDay);
        });
        
        calendarElement.appendChild(dayCell);
    }
}

// Get tasks for a specific date
function getTasksForDate(dateString) {
    return tasks.filter(task => {
        const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
        return taskDate === dateString;
    });
}

// Display tasks for selected date
function displayTasksForSelectedDate(dateString, tasksForDate) {
    const selectedDateTasksElement = document.getElementById('selectedDateTasks');
    if (!selectedDateTasksElement) return;
    
    // Clear previous content
    selectedDateTasksElement.innerHTML = '';
    
    // Format the date nicely
    const displayDate = new Date(dateString + 'T00:00:00');
    const formattedDate = displayDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = `Tasks for ${formattedDate}`;
    selectedDateTasksElement.appendChild(header);
    
    // Display tasks
    if (tasksForDate.length === 0) {
        const noTasks = document.createElement('p');
        noTasks.className = 'no-tasks';
        noTasks.textContent = 'No tasks scheduled for this day';
        selectedDateTasksElement.appendChild(noTasks);
    } else {
        tasksForDate.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`;
            taskItem.style.marginTop = '0.75rem';
            
            taskItem.innerHTML = `
                <div class="task-card-header">
                    <h3 style="font-size: 0.95rem;">${task.title}</h3>
                    <span class="priority-badge">${task.priority}</span>
                </div>
                <p class="task-description">${task.description || 'No description'}</p>
                <p class="task-due-date">${new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
            `;
            
            selectedDateTasksElement.appendChild(taskItem);
        });
    }
}

// Navigate to previous month
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Navigate to next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}
