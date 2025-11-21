import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

// FIX: Check if model exists before compiling
export default mongoose.models.User || mongoose.model('User', UserSchema);