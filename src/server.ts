import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use((req, res) => {
    console.log(`Unhandled request: ${req.method} ${req.url}`);
    res.status(404).json({ msg: 'Route not found' });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));