const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: String,
  location: String,
  startDate: Date,
  endDate: Date,
  memberCount: Number,
  createdBy: String, // Admin who created the event
  status: String,  // e.g., planned, ongoing, completed
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]  // Reference to tasks
});

module.exports = mongoose.model('Event', EventSchema);
