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
      li.className = `task-card ${task.completed ? 'completed' : ''}`;

      const title = capitalize(task.title || "Untitled Task");
      const desc = capitalize(task.description || "No description");
      const status = task.completed ? "✅ Done" : "⌛ Pending";

      li.innerHTML = `
        <h3>${title}</h3>
        <p>${desc}</p>
        <label style="display:none;">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} />
        </label>
        <p class="status-text">${status}</p>
      `;

      if (task.completed) completedCount++;

      // 📌 Add click to mark as completed/incomplete
      li.addEventListener("click", async () => {
        try {
          const isCompleted = !task.completed;

          const response = await fetch(`http://localhost:5000/api/tasks/mark-complete/${task._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: isCompleted }),
          });

          if (response.ok) {
            task.completed = isCompleted;
            li.classList.toggle('completed', isCompleted);
            const statusText = li.querySelector('.status-text');
            statusText.textContent = isCompleted ? '✅ Done' : '⌛ Pending';

            loadTasks(); // 🔁 Re-fetch to update progress circle
          } else {
            console.error("Failed to update task status");
          }
        } catch (err) {
          console.error("Error marking task as complete:", err);
        }
      });

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
