import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  gaveLocationPermission: {
    type: Boolean,
    default: false
  },
  location: {
    type: [Number], // [lat, long]
    default: []
  },
  followers: [{
    type: String,
    ref: 'User'
  }],
  following: [{
    type: String,
    ref: 'User'
  }]
}, { timestamps: true });

// FIX: Check if model exists before compiling
export default mongoose.models.User || mongoose.model('User', UserSchema);