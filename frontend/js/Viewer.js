// Fetch tasks from your backend API
async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5000/tasks"); // Update this URL if hosted differently
      const tasks = await response.json();
      renderGroupedTasks(tasks);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      document.getElementById("eventSections").innerHTML =
        "<p style='color: red;'>Failed to load tasks from the server. Please check connection.</p>";
    }
  }
  
  // Group and render tasks by eventType
  function renderGroupedTasks(tasks) {
    const container = document.getElementById("eventSections");
    container.innerHTML = "";
  
    const grouped = {};
  
    // Group tasks by eventType
    tasks.forEach(task => {
      const type = task.eventType || "general";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(task);
    });
  
    // Render each event group
    Object.keys(grouped).forEach(type => {
      const section = document.createElement("section");
      section.classList.add("event-section");
  
      const title = document.createElement("h3");
      title.className = `event-title ${type}`;
      title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  
      const taskContainer = document.createElement("div");
      taskContainer.className = "task-container";
  
      grouped[type].forEach(task => {
        const card = document.createElement("div");
        card.className =`task-card ${task.status}`;
        card.innerHTML = `
          <div class="task-title">${task.title}</div>
          <div class="task-info"><b>Assigned to:</b> ${task.assignedTo}</div>
          <div class="task-info"><b>Status:</b> 
            <span style="color: ${task.status === 'done' ? '#27ae60' : '#e67e22'};">
              ${task.status}
            </span>
          </div>
        `;
        taskContainer.appendChild(card);
      });
  
      section.appendChild(title);
      section.appendChild(taskContainer);
      container.appendChild(section);
    });
  }
  
  // Load tasks when page is ready
  document.addEventListener("DOMContentLoaded", fetchTasks);