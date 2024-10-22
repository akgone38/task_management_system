// import express from 'express';
// import auth from '../middlewares/authMiddleware.js'; 
// import { createTask, getTasks } from '../controllers/taskController.js';

// const router = express.Router();

// router.get('/',auth, getTasks);
// router.post('/',auth, createTask);

// export default router;

import express from 'express';
import { createTask, getTasks, getTaskByTaskNumber, addComment } from '../controllers/taskController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.get('/:taskNumber', auth, getTaskByTaskNumber);
router.post('/:taskNumber/comments', auth, addComment);

export default router;

