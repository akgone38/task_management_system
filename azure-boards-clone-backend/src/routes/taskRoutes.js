// import express from 'express';
// import auth from '../middlewares/authMiddleware.js'; 
// import { createTask, getTasks } from '../controllers/taskController.js';

// const router = express.Router();

// router.get('/',auth, getTasks);
// router.post('/',auth, createTask);

// export default router;

import express from 'express';
import { createTask, getTasks, getTaskByTaskNumber, addComment,editComment,updateTaskDetails } from '../controllers/taskController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.get('/:taskNumber', auth, getTaskByTaskNumber);
// Add a new comment
router.post('/:taskNumber/comments', auth, addComment);
// Edit an existing comment
router.put('/:taskNumber/comments/:commentId', editComment);
router.patch('/:taskNumber', auth, updateTaskDetails);


export default router;

