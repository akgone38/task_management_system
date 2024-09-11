import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists', 
        statusCode: 400,
        error: 'Bad Request' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('User registered successfully');
    
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error'
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid Credentials', 
        statusCode: 400,
        error: 'Bad Request' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid Credentials', 
        statusCode: 400,
        error: 'Bad Request' 
      });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ user: payload.user, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error'
    });
  }
};

// Get User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found', 
        statusCode: 404, 
        error: 'Not Found' 
      });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error'
    });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users excluding password field
    const users = await User.find().select('-password');

    // Check if any users exist
    if (!users) {
      return res.status(404).json({
        message: 'No users found',
        statusCode: 404,
        error: 'Not Found',
      });
    }

    // Respond with all users
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
};
