import { Task } from '../models/taskModel.js';
import { User } from '../models/userModel.js';

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks: ' + error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, priority, assignedToEmail } = req.body;

  // Validate the request body
  if (!title || !description || !priority) {
    return res.status(400).json({ message: 'Title, description, and priority are required' });
  }

  try {
    // For simplicity, we are hardcoding the current user ID
    const createdBy = "66d59ad606d30d27e1730693"; // Replace this with your actual current user ID retrieval logic

    // If assignedToEmail is provided, find the corresponding user
    let assignedTo = null;
    if (assignedToEmail) {
      const user = await User.findOne({ email: assignedToEmail });
      if (user) {
        assignedTo = user._id;
      } else {
        return res.status(400).json({ message: 'Assigned user not found' });
      }
    }

    // Create the task
    const task = new Task({
      title,
      description,
      priority,
      assignedTo,
      createdBy,
    });

    // Save the task to the database
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    res.status(500).json({ message: 'Error creating task: ' + error.message });
  }
};
