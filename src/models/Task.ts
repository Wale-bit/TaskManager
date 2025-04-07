import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model('Task', taskSchema);