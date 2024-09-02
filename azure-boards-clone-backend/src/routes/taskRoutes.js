import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js'; 
import { createTask, getTasks } from '../controllers/taskController.js';

const router = express.Router();

// // Route to get all tasks
//  router.get('/', getTasks);

// // Route to create a task
// router.post('/', createTask);

// router.get('/tasks', authenticate, getTasks);
// router.post('/tasks', authenticate, createTask);
router.get('/tasks', getTasks);
router.post('/tasks', createTask);

export default router;
