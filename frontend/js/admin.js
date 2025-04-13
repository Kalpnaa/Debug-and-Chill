// ✅ Retrieve username and role from localStorage
const username = localStorage.getItem("username");
const role = localStorage.getItem("role");

// ✅ Check if user is admin
if (role !== "admin") {
  alert("Unauthorized access");
  window.location.href = "login.html";
}

// ✅ Check if user is logged in
if (!username) {
  alert("User not logged in.");
  window.location.href = "login.html";
}

// ✅ Event Creation Handler
async function createNewEvent(event) {
  event.preventDefault();

  const name = document.getElementById("event-name").value.trim();
  const location = document.getElementById("trip-location").value.trim();
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const memberCount = document.getElementById("member-count").value;

  if (!name || !location || !startDate || !endDate || !memberCount) {
    return alert("All fields are required.");
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
        status: "planned",
        tasks: [],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create event.");
      return;
    }

    alert(data.message || "Event created successfully.");

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

// ✅ Load Events for This Admin
async function loadEvents() {
  try {
    const response = await fetch(`http://localhost:5000/api/events/admin-events?admin=${username}`);
    
    if (!response.ok) {
      console.error("HTTP error:", response.status);
      return;
    }

    const events = await response.json();

    // 🔽 Display events in your frontend (example logic)
    const eventList = document.getElementById("event-list"); // Make sure your HTML has this ID
    eventList.innerHTML = "";

    events.forEach(event => {
      const li = document.createElement("li");
      li.textContent = `${event.name} - ${event.location} (${event.startDate} to ${event.endDate})`;
      eventList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}

// ✅ Load Events for This Admin
async function loadEvents() {
  try {
    const response = await fetch(`http://localhost:5000/api/events/admin-events?admin=${username}`);
    
    if (!response.ok) {
      console.error("HTTP error:", response.status);
      return;
    }

    const events = await response.json();

    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach(event => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `event.html?id=${event._id}`;
      a.textContent = `${event.name} - ${event.location} (${new Date(event.startDate).toLocaleDateString()} to ${new Date(event.endDate).toLocaleDateString()})`;
      a.style.textDecoration = "none";
      a.style.color = "#007bff";
      a.style.cursor = "pointer";

      li.appendChild(a);
      eventList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching events:", err);
  }
}


// ✅ Load events on page load
window.addEventListener("DOMContentLoaded", loadEvents);
