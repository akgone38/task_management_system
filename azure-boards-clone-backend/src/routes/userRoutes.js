import express from 'express';
import { getUsers } from '../controllers/userController.js';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.get('/users', getUsers);
router.post('/users', createUser);  

export default router;
