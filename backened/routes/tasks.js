const express = require("express");
const router = express.Router();

// 🔍 DEBUG BLOCK — Add this before anything else
try {
  const Task = require("../models/Task");
  console.log("✅ Task model loaded successfully");
} catch (err) {
  console.error("❌ Failed to load Task model:", err);
}

// 🔁 Re-import again normally (after debug block)
const Task = require("../models/Task");
const Event = require("../models/Event");

// Create and link a task to an event
router.post("/create", async (req, res) => {
  try {
    const { title, description, assignedTo, createdBy, eventId } = req.body;

    if (!title || !assignedTo || !createdBy || !eventId) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy,
      eventId,
    });

    const savedTask = await newTask.save();

    const event = await Event.findById(eventId);
    if (event) {
      event.tasks.push(savedTask._id);
      await event.save();
    }

    res.status(201).json({ message: "Task created", task: savedTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});


router.get("/member/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const tasks = await Task.find({ assignedTo: username });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.get("/assigned/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const tasks = await Task.find({ assignedTo: username });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});



module.exports = router;
