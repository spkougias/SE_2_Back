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
  ageGroup: [{
    type: String,
    enum: ['Everyone','Teens','Adults'],
    default: 'Everyone'
  }],
  category: [{
    type: String,
    enum: ['Party','Concert','Bazaar','Movie Night','Competition','Workshop','Food Event','Other'],
    default: 'Other'
  }],
  photos: [String],
  host: {
    type: String, // Storing username or ID reference
    required: true
  },
  interestedIn: [String], // Array of usernames
  vouchers: [String], // Array of usernames
  comments: [String]
}, { timestamps: true });

// FIX: Check if model exists before compiling
export default mongoose.models.Event || mongoose.model('Event', EventSchema);