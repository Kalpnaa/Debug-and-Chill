// event.js
async function loadEventDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id'); // Get the event ID from the URL
  
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

      // Display the list of tasks (if any)
      const taskList = document.getElementById('task-list');
      if (event.tasks && event.tasks.length > 0) {
        event.tasks.forEach((task) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Assigned to:</strong> ${task.assignedTo}</p>
            <p><strong>Status:</strong> ${task.status}</p>
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

// Load event details when page is ready
window.addEventListener("DOMContentLoaded", loadEventDetails);
