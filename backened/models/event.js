const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  startDate: Date,
  endDate: Date,
  memberCount: Number,
  createdBy: String,
  status: { type: String, default: "planned" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

module.exports = mongoose.models.Event || mongoose.model("Event", eventSchema);
