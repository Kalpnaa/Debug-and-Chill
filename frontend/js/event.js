// event.js
async function loadEventDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (!eventId) {
    alert("No event ID provided.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/events/${eventId}`);
    const event = await res.json();

    if (res.ok && event) {
      document.getElementById('event-name').innerText = event.name;
      document.getElementById('event-location').innerText = event.location;
      document.getElementById('event-start-date').innerText = new Date(event.startDate).toLocaleDateString();
      document.getElementById('event-end-date').innerText = new Date(event.endDate).toLocaleDateString();
      document.getElementById('event-member-count').innerText = event.memberCount;
      document.getElementById('event-status').innerText = event.status;

      const taskList = document.getElementById('task-list');
      taskList.innerHTML = ""; // Clear previous list

      if (event.tasks && event.tasks.length > 0) {
        event.tasks.forEach((task) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <p><strong>Title:</strong> ${task.title || "N/A"}</p>
            <p><strong>Description:</strong> ${task.description || "N/A"}</p>
            <p><strong>Assigned to:</strong> ${task.assignedTo || "N/A"}</p>
            <p><strong>Status:</strong> ${task.status || "N/A"}</p>
          `;
          taskList.appendChild(li);
        });
      } else {
        taskList.innerHTML = "<li>No tasks assigned yet.</li>";
      }
    } else {
      alert("Failed to load event details.");
    }
  } catch (err) {
    console.error("Error fetching event:", err);
    alert("Failed to load event details.");
  }
}

async function addTask() {
  const taskName = document.getElementById("task-name").value.trim();
  const assignedTo = document.getElementById("assigned-to").value.trim();
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (!taskName || !assignedTo || !eventId) {
    alert("Task name, assigned user, and event ID are required.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/tasks/add/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: taskName,
        description: "", // You can add a textarea for this in your HTML if needed
        assignedTo,
        status: "pending",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to add task.");
      return;
    }

    alert("Task added successfully!");
    loadEventDetails(); // Refresh tasks without full reload
  } catch (err) {
    console.error("Error adding task:", err);
    alert("Error adding task.");
  }
}

window.addEventListener("DOMContentLoaded", loadEventDetails);
