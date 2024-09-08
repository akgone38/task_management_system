import { Task } from '../models/taskModel.js';
import { User } from '../models/userModel.js';


// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks: ' + error.message });
  }
};

// Get all tasks
export const createTask = async (req, res) => {
  const { title, description, priority, assignedTo, status } = req.body;

  // Validate the request body
  if (!title || !description || !priority) {
    return res.status(400).json({ message: 'Title, description, and priority are required' });
  }

  // Ensure status is one of the allowed values or use default
  const validStatuses = ['Active', 'In Progress', 'Completed', 'Hold', 'New'];
  const validatedStatus = validStatuses.includes(status) ? status : 'New';

  try {
    // Hardcoded current user ID for simplicity
    const createdBy = "66d59ad606d30d27e1730693"; // Replace this with actual current user ID retrieval logic

    // Validate the assignedTo user if provided
    let assignedUser = null;
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(400).json({ message: 'Assigned user not found' });
      }
      assignedUser = user._id;
    }

    // Create the task
    const task = new Task({
      title,
      description,
      priority,
      assignedTo: assignedUser, // Use the assigned user's ID
      createdBy,
      status: validatedStatus // Use validated status
    });

    // Save the task to the database
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error); // Log the error
    res.status(500).json({ message: 'Error creating task: ' + error.message });
  }
};

