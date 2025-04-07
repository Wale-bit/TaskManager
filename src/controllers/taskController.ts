import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, user: req.user!.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user!.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user!.id },
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, user: req.user!.id });
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};