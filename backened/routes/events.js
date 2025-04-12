const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Create a new event
router.post("/create", async (req, res) => {
  try {
    const { name, location, startDate, endDate, memberCount, createdBy, tasks = [] } = req.body;

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
      tasks,  // Empty tasks array initially
      status: "planned",  // Default status
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", _id: newEvent._id });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Error creating event" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("tasks");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching event details" });
  }
});


module.exports = router;
