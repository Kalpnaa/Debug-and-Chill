const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// ✅ CREATE NEW EVENT
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      location,
      startDate,
      endDate,
      memberCount,
      createdBy,
      status,
    } = req.body;

    const newEvent = new Event({
      name,
      location,
      startDate,
      endDate,
      memberCount,
      createdBy,
      status,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ message: "Event created", event: savedEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET EVENTS CREATED BY A SPECIFIC ADMIN
router.get("/admin-events", async (req, res) => {
  try {
    const { admin } = req.query;
    if (!admin) {
      return res.status(400).json({ message: "Admin username is required" });
    }

    const events = await Event.find({ createdBy: admin });
    res.json(events);
  } catch (err) {
    console.error("Error fetching events for admin:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Add a new task to an event
router.post('/add/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Add task to event
    const newTask = { title, description, assignedTo, status };
    event.tasks.push(newTask);
    await event.save();

    res.status(200).json({ message: 'Task added successfully', event });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("tasks"); // ✅ Important
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching event" });
  }
});




module.exports = router;
