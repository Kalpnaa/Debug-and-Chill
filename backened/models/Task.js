const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,  // User to whom the task is assigned
  status: String,  // e.g., pending, completed
  createdBy: String,  // Admin who created the task
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

module.exports = mongoose.model('Task', TaskSchema);
