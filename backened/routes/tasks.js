const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Fetch all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("eventId");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

// Create a task
router.post("/create", async (req, res) => {
  try {
    const { title, description, assignedTo, createdBy, eventId } = req.body;

    const newTask = new Task({ title, description, assignedTo, createdBy, eventId });
    await newTask.save();

    res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.get("/assigned/:username", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.username });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});



module.exports = router;
