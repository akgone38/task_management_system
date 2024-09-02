import { User } from '../models/userModel.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users: ' + error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate the request body
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Create the new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error creating user:', error); // Log the error
    res.status(500).json({ message: 'Error creating user: ' + error.message });
  }
};