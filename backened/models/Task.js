const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  createdBy: String,
  completed: { type: Boolean, default: false },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
