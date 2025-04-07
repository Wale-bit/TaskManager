import express from 'express';
import auth from '../middleware/auth';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;