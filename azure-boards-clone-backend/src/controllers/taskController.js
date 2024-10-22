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

// Get task by taskNumber
export const getTaskByTaskNumber = async (req, res) => {
  const { taskNumber } = req.params;

  try {
    const task = await Task.findOne({ taskNumber }).populate('assignedTo', 'name').exec();
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task by task number:', error);
    res.status(500).json({ message: 'Error fetching task by task number: ' + error.message });
  }
};

// Create a new task
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
    // Get the current logged-in user's ID from req.user
    const createdBy = req.user._id;

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
      assignedTo: assignedUser,
      createdBy,
      status: validatedStatus
    });

    // Save the task to the database
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task: ' + error.message });
  }
};

// Function to add a comment to a task by taskNumber
export const addComment = async (req, res) => {
  const { taskNumber } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    // Find the task by taskNumber
    const task = await Task.findOne({ taskNumber });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if user is authenticated and req.user is populated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Add the comment
    task.comments.unshift({
      text,
      author: req.user.name || req.user.id, // Ensure req.user is valid
    });

    // Save the updated task
    await task.save();

    res.status(201).json(task.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment: ' + error.message });
  }
};