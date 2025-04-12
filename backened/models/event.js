const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ["pending", "completed"] },
});

const EventSchema = new mongoose.Schema({
  name: String,
  status: String,
  createdBy: String,
  tasks: [TaskSchema],  // Embedded tasks
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
