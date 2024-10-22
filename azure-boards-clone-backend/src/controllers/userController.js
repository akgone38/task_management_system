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
        error: 'Bad Request',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      authMethod: 'email',  // Set auth method to 'email'
    });

    await newUser.save();
    console.log('User registered successfully');

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials',
        statusCode: 400,
        error: 'Bad Request',
      });
    }

    // Check if the user registered using Google OAuth
    if (user.authMethod === 'google') {
      return res.status(400).json({
        message: 'You signed up with Google. Please use Google to log in.',
        statusCode: 400,
        error: 'Bad Request',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials',
        statusCode: 400,
        error: 'Bad Request',
      });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user: payload.user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error',
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
        error: 'Not Found',
      });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    console.log("GET /api/users/users - Request received");
    
    // Log the authenticated user (from auth middleware)
    console.log("Authenticated User ID: ", req.user.id);
    const users = await User.find().select('-password');
    console.log("Users fetched from database: ", users.length, "users found.");
    if (users.length === 0) {
      return res.status(404).json({
        message: 'No users found',
        statusCode: 404,
        error: 'Not Found',
      });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error in fetching users:", error.message);
    res.status(500).json({
      message: 'Server error',
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
};

// Handle OAuth User Login/Signup
export const handleOAuthLogin = async (profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    // console.log("user:-")
    if (!user) {
      // If the user doesn't exist, create a new user with authMethod set to 'google'
      user = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleID: profile.id,
        authMethod: 'google', // Set auth method to 'google'
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    console.error('OAuth login error:', error);
    return done(error, null);
  }
};

