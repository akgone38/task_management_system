import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a User model for task assignment
  },
  createdBy: { 
    type: String,
    required: true 
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  // Add other task-related fields as needed
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
