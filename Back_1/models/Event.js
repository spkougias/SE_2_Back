import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true // Using integer ID to match Swagger, normally ObjectId is preferred
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  location: {
    type: [Number], // [lat, long]
    required: true
  },
  description: {
    type: String
  },
  ageGroup: {
    type: String,
    enum: ['everyone', 'teens', 'adults'],
    default: 'everyone'
  },
  category: {
    type: String,
    enum: ['party', 'concert', 'bazaar', 'movie night', 'competition', 'workshop', 'food event', 'other'],
    default: 'other'
  },
  photos: [String],
  host: {
    type: String, // Storing username or ID reference
    required: true
  },
  interestedIn: [String], // Array of usernames
  vouchers: [String], // Array of usernames
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });

// FIX: Check if model exists before compiling
export default mongoose.models.Event || mongoose.model('Event', EventSchema);