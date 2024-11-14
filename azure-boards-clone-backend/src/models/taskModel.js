import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Generate unique task number
const generateTaskNumber = async () => {
  let taskNumber;
  let isUnique = false;

  while (!isUnique) {
    taskNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    const existingTask = await Task.findOne({ taskNumber }).exec();
    if (!existingTask) {
      isUnique = true;
    }
  }
  return taskNumber;
};

// Define Comment Schema
const commentSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Define Task Schema
const taskSchema = new Schema({
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
    ref: 'User',
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'In Progress', 'Completed', 'Hold', 'New'],
    default: 'New',
  },
  taskNumber: {
    type: Number,
    unique: true,
  },
  comments: [commentSchema]
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
