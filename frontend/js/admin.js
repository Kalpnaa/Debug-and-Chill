// Ensure you retrieve the username and role from localStorage at the beginning of your script
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

// Check if the user has the 'admin' role
if (role !== "admin") {
  alert("Unauthorized access");
  window.location.href = "login.html"; // Redirect to login if unauthorized
}

// Make sure the username exists before using it
if (!username) {
  alert("User not logged in.");
  window.location.href = "login.html"; // Redirect to login if the username is missing
}

async function createNewEvent(event) {
  // Prevent the form from submitting the default way
  event.preventDefault();

  const name = document.getElementById("event-name").value.trim();
  const location = document.getElementById("trip-location").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const memberCount = document.getElementById("member-count").value;

  if (!name || !location || !startDate || !endDate || !memberCount) {
    return alert("All fields are required.");
  }

  // Ensure username is retrieved properly
  if (!username) {
    alert("User not logged in.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        location,
        startDate,
        endDate,
        memberCount,
        createdBy: username,
        status: "planned",  // Default status or add more logic as needed
        tasks: [],  // Initially no tasks
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create event.");
      return;
    }

    alert(data.message || "Event created");

    // Redirect to the event page after creation
    const eventId = data._id || (data.event && data.event._id);
    if (eventId) {
      window.location.href = `event.html?id=${eventId}`;
    } else {
      alert("Event creation failed. No event ID returned.");
    }
  } catch (err) {
    console.error("Error creating event:", err);
    alert("Failed to create event.");
  }
}

// Load the events when the page is ready
async function loadEvents() {
  const eventList = document.getElementById("event-list");

  try {
    const res = await fetch("http://localhost:5000/api/events");
    const events = await res.json();

    events.forEach((event) => {
      const li = document.createElement("li");
      li.className = "event-card";

      const start = new Date(event.startDate).toLocaleDateString();
      const end = new Date(event.endDate).toLocaleDateString();

      li.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Dates:</strong> ${start} – ${end}</p>
        <p><strong>Members:</strong> ${event.memberCount}</p>
        <p><strong>Status:</strong> ${event.status}</p>
        <a href="event.html?id=${event._id}">🔍 View Event</a>
      `;

      eventList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}

// Call the loadEvents function when the page is loaded
window.addEventListener("DOMContentLoaded", loadEvents);
