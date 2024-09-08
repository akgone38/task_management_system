import mongoose from 'mongoose';

// Define a function to generate the next task number
// const generateTaskNumber = async () => {
//   const lastTask = await Task.findOne().sort({ taskNumber: -1 }).exec();
//   return lastTask ? lastTask.taskNumber + 1 : 1;
// };
// Function to generate a random 4-digit number
const generateTaskNumber = async () => {
  let taskNumber;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random 4-digit number
    taskNumber = Math.floor(1000 + Math.random() * 9000);
    
    // Check if this number already exists in the database
    const existingTask = await Task.findOne({ taskNumber }).exec();
    
    // If the number is unique, break the loop
    if (!existingTask) {
      isUnique = true;
    }
  }

  return taskNumber;
};

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
  status: {
    type: String,
    enum: ['Active', 'In Progress', 'Completed', 'Hold', 'New'], // Define your status options
    default: 'New', // Default value
  },
  taskNumber: {
    type: Number,
    unique: true,
  }
}, { timestamps: true });

// Pre-save hook to set taskNumber
taskSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      this.taskNumber = await generateTaskNumber();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export const Task = mongoose.model('Task', taskSchema);
