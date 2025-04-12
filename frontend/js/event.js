async function loadEventDetails(eventId) {
  console.log("Fetching event with ID:", eventId);  // Log the event ID

  try {
    const res = await fetch(`http://localhost:5000/api/events/${eventId}`);

    if (!res.ok) {
      const errorMessage = `Error fetching event: ${res.statusText}`;
      document.getElementById("event-status").textContent = errorMessage;
      document.getElementById("event-status").style.color = 'red';  // Show error in red
      return;
    }

    const event = await res.json();

    // Check if event data is returned
    if (!event) {
      document.getElementById("event-status").textContent = "No event found.";
      return;
    }

    // Populate event details on the page
    document.getElementById("event-name").textContent = event.name;
    document.getElementById("event-status").textContent = `Status: ${event.status}`;
    document.getElementById("event-createdBy").textContent = `Created By: ${event.createdBy}`;

    const tasksList = document.getElementById("event-tasks");
    tasksList.innerHTML = ""; // Clear previous tasks

    // Populate task details
    if (event.tasks && event.tasks.length > 0) {
      event.tasks.forEach((task) => {
        const taskItem = document.createElement("p");
        taskItem.textContent = `${task.name} - Status: ${task.status}`;
        tasksList.appendChild(taskItem);
      });
    } else {
      tasksList.textContent = "No tasks assigned to this event.";
    }
  } catch (err) {
    console.error("Error loading event details:", err);
    document.getElementById("event-status").textContent = `Error loading event details: ${err.message || err}`;
    document.getElementById("event-status").style.color = 'red';  // Show error in red
  }
}
