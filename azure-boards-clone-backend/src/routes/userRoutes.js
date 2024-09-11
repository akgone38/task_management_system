import express from 'express';
import { registerUser, loginUser, getUser, getAllUsers } from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get current logged-in user route
router.get('/user', auth, getUser);

// Get all users route (requires authentication)
router.get('/users', auth, getAllUsers);  // New route to get all users

export default router;
