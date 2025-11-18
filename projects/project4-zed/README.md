# Project Zed: Task Manager & Event Countdown

**Course:** WRIT 40363 - Digital Composition & Data Analysis  
**Project Type:** AI-Assisted Web Application  
**Semester:** Fall 2025  
**Due Date:** December 10, 2025

## 🎯 Project Overview

This is my final project for WRIT 40363, built as an ambitious web application using AI as a development partner. The goal of this project is to demonstrate **upskilling**—taking techniques learned in Projects 1-3 and pushing beyond them with AI assistance.

### What I Built

A comprehensive **Task Manager with Calendar Integration and Event Countdown Timers**. This application helps users stay organized by:

- Creating and managing tasks with priorities and due dates
- Viewing tasks in an interactive monthly calendar
- Tracking time remaining until important events with live countdown timers
- Filtering tasks by completion status
- Receiving browser notifications before deadlines

### Why This Project?

I chose to build a task management app because:
1. It combines practical utility with technical challenge
2. It allows me to integrate multiple skills from previous projects (DOM manipulation, localStorage, async operations)
3. It pushes me to learn new techniques like calendar rendering algorithms and real-time countdown updates
4. It's genuinely useful for managing coursework and personal deadlines

## 🚀 Technologies Used

### Core Technologies
- **HTML5** - Semantic markup and form elements
- **CSS3** - Grid layout, custom properties, animations
- **Vanilla JavaScript** - No frameworks, modular architecture

### Browser APIs
- **localStorage API** - Persistent task storage
- **Notifications API** - Deadline reminders
- **Date API** - Calendar calculations and countdown logic

### AI Tools Used
- **GitHub Copilot (Claude Sonnet 4.5)** - Primary development partner
- **Gemini 3 Pro** - Secondary consultation for alternative approaches

## ✨ Features

### Current Functionality
- ✅ Add tasks with title, description, due date/time, priority level, and notification settings
- ✅ Interactive calendar view with clickable dates
- ✅ Visual indicators for days with scheduled tasks
- ✅ Click any date to see all tasks scheduled for that day
- ✅ Live countdown timers showing time remaining until each event
- ✅ Filter tasks by: All / Active / Completed
- ✅ Mark tasks as complete or delete them
- ✅ Responsive widget-based grid layout
- ✅ Priority color coding (High: Red, Medium: Orange, Low: Green)
- ✅ Browser notifications for upcoming deadlines

### Upskilled Techniques from Previous Projects

#### From Project 1 (HTML/CSS)
- **CSS Grid with responsive breakpoints** - Widget layout adapts from 1-column (mobile) to 2-column (tablet) to 3-column (desktop)
- **CSS Custom Properties** - Could be extended for theming (planned enhancement)
- **Advanced layout patterns** - Full-width widgets, sidebar-style form

#### From Project 2 (JavaScript Fundamentals)
- **Modular JavaScript** - Separated into `app.js`, `tasks.js`, `calendar.js`, `countdown.js`
- **Complex DOM manipulation** - Dynamic calendar rendering, task card generation
- **Event delegation** - Calendar day clicks, filter buttons
- **Data structures** - Task objects with multiple properties, sorted arrays

#### From Project 3 (APIs & Advanced JS)
- **localStorage for state persistence** - Tasks survive page refreshes
- **Async patterns** - `setInterval` for countdown updates, notification timing
- **Complex state management** - Coordinating tasks across calendar, list, and countdown views

#### New Techniques (Learned via AI)
- **Calendar algorithms** - Calculating first day of month, days in month, date matching
- **Real-time updates** - `setInterval` for live countdown timers
- **Browser Notifications API** - Permission requests and scheduled alerts
- **Interactive date selection** - Highlighting selected dates, showing filtered task views

## 📂 Project Structure

```
project4-zed/
├── index.html                 # Main application page
├── README.md                  # This file
├── REFLECTION.md              # Developer reflection (500-750 words)
├── AI_COLLABORATION_LOG.md    # Documentation of AI partnership
├── CLAUDE.md                  # Session protocol and rules
├── css/
│   └── styles.css            # All styling (organized by sections)
├── js/
│   ├── app.js                # Main application logic and initialization
│   ├── tasks.js              # Task CRUD operations and localStorage
│   ├── calendar.js           # Calendar rendering and interaction
│   └── countdown.js          # Countdown timer calculations
└── images/                    # (Future: notification icons, assets)
```

## 🛠️ Setup Instructions

### Running Locally

1. **Clone or download this repository**
   ```bash
   git clone [your-repo-url]
   cd project4-zed
   ```

2. **Open in a browser**
   - Simply open `index.html` in any modern web browser
   - No build process or dependencies required!

3. **Enable notifications (optional)**
   - When prompted, click "Allow" to receive deadline reminders
   - Notifications work in Chrome, Firefox, Edge, and Safari

### Deployment

This project is deployed on **GitHub Pages**:
- **Live URL:** [Coming soon - will be added before December 10]

To deploy your own version:
1. Push code to a GitHub repository
2. Go to Settings → Pages
3. Select branch to deploy (usually `main`)
4. Site will be live at `https://[username].github.io/[repo-name]`

## 🎓 Learning Goals

### What I Hoped to Learn
- How to render an interactive calendar from scratch
- How to implement real-time countdown timers
- How to use the Browser Notifications API
- How to structure a multi-file JavaScript project
- How to work effectively with AI as a coding partner

### Skills Demonstrated
- **Problem decomposition** - Breaking a complex app into manageable modules
- **Algorithm design** - Calendar date calculations, time remaining logic
- **State management** - Keeping UI in sync across multiple views
- **User experience design** - Responsive layout, visual feedback, accessibility
- **AI collaboration** - Effective prompting, critical evaluation, iterative refinement

## 📝 Development Process

### Stage 1: Planning (Mid-November)
- Chose task manager concept
- Discussed layout options with AI (widget grid vs. single column)
- Defined MVP features and stretch goals

### Stage 2: Core Development (Late November)
- Built modular JavaScript architecture
- Implemented task CRUD operations with localStorage
- Created basic calendar rendering
- Added countdown timer logic

### Stage 3: Enhancement (Early December)
- Made calendar fully interactive with click handlers
- Added filter functionality
- Implemented browser notifications
- Refined CSS and responsive design

### Stage 4: Final Polish (Week of December 10)
- Cross-browser testing
- Accessibility improvements
- Documentation completion
- Portfolio integration

## 🙏 Credits

### AI Assistance
- **GitHub Copilot (Claude Sonnet 4.5)** - Code generation, debugging, concept explanations
- **Gemini 3 Pro** - Alternative approaches and validation

### Resources & Learning
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript Date API, Notifications API
- [CSS-Tricks](https://css-tricks.com/) - Grid layout patterns
- Course materials from WRIT 40363

### Built By
**[Your Name]**  
TCU Student | WRIT 40363 Fall 2025

---

## 📌 Project Context

This project fulfills the requirements for **Project Zed: AI-Assisted Web Application** in WRIT 40363. The assignment emphasizes:
- Upskilling techniques from earlier projects
- Learning through AI collaboration
- Documenting the development journey
- Building something ambitious (even if imperfect)

*"The insight gained from attempting something difficult is more valuable than a perfect app you don't understand."*

For more details, see:
- `AI_COLLABORATION_LOG.md` - My AI partnership documentation
- `REFLECTION.md` - Developer reflection on learning and growth

---

**Last Updated:** November 2025  
**Status:** In Development 🚧
