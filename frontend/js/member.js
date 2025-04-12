// 📁 member.js - Frontend logic for members

const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

if (role !== "member") {
  alert("Unauthorized access");
  window.location.href = "login.html";
}

// Fetch and display tasks assigned to the logged-in member
async function loadMemberTasks() {
  try {
    const res = await fetch(`http://localhost:5000/api/tasks/assigned/${username}`);
    const tasks = await res.json();
    
    const container = document.getElementById("task-container");
    container.innerHTML = "";

    let completed = 0;

    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.className = "task-card";
      div.innerHTML = `
        <span class="task-name">${task.title}</span>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="updateTask('${task._id}', this.checked)" />
      `;
      container.appendChild(div);

      if (task.completed === true) completed++; // Safer check
    });

    console.log(`Tasks loaded: ${tasks.length}, Completed: ${completed}`);
    updateProgress(completed, tasks.length);
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}




// Update task completion status
async function updateTask(taskId, isCompleted) {
  try {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: isCompleted })
    });

    const data = await res.json();
    if (res.ok) loadMemberTasks();
  } catch (err) {
    console.error("Error updating task:", err);
  }
}

function updateProgress(completed, total) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const bar = document.getElementById("progress-bar");
  bar.style.width = `${percent}%`;
  bar.textContent = `${percent}%`;
}

loadMemberTasks();