import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log("No token provided, unauthorized access.");
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Add this line
    req.user = await User.findById(decoded.user.id).select('-password'); // Get user without password

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    console.log("Authenticated User:", req.user); // Add this line
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
