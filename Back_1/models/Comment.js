import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  poster: {
    type: String, // Username
    required: true
  },
  eventId: {
    type: Number,
    required: true
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// FIX: Check if model exists before compiling
export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);