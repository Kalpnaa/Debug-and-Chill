const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Create a new event
router.post("/create", async (req, res) => {
  try {
    const { name, location, startDate, endDate, memberCount, createdBy } = req.body;

    if (!name || !location || !startDate || !endDate || !memberCount || !createdBy) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEvent = new Event({
      name,
      location,
      startDate,
      endDate,
      memberCount,
      createdBy,
      status: "planned",
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", _id: newEvent._id });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Error creating event" });
  }
});

// Fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Fetch a single event with tasks populated
// In routes/events.js
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("tasks"); // <-- This is IMPORTANT

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});


module.exports = router;
