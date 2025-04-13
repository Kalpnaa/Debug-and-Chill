// ✅ Capitalize helper
function capitalize(value) {
  if (!value || typeof value !== 'string') return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// 📈 Update progress ring circle
function updateProgressCircle(percent) {
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  circle.style.stroke = 'url(#instaGradient)';
}

// 🚀 Load tasks for logged-in member
async function loadTasks() {
  try {
    const username = localStorage.getItem("username") || "guest";
    const response = await fetch(`http://localhost:5000/api/tasks/assigned/${username}`);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    let completedCount = 0;

    data.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-card";

      const title = capitalize(task.title || "Untitled Task");
      const desc = capitalize(task.description || "No description");
      const status = task.completed ? "✅ Done" : "⌛ Pending";

      li.innerHTML = `
        <h3>${title}</h3>
        <p>${desc}</p>
        <p>Status: ${status}</p>
      `;

      if (task.completed) completedCount++;

      taskList.appendChild(li);
    });

    const percent = data.length > 0 ? Math.round((completedCount / data.length) * 100) : 0;
    document.getElementById("progress-percent").textContent = `${percent}%`;
    updateProgressCircle(percent);

  } catch (err) {
    console.error("Failed to load tasks:", err);
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = `<li class="error">⚠️ Could not load tasks. Try again later.</li>`;
  }
}

// ⏱️ Run on load
window.addEventListener("DOMContentLoaded", loadTasks);
