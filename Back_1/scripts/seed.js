import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import mock data
import { mockUsers, mockEvents, mockComments } from '../utils/mockData.js';

// Import models
import User from '../models/User.js';
import Event from '../models/Event.js';
import Comment from '../models/Comment.js';

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing collections
    await User.deleteMany({});
    await Comment.deleteMany({});
    await Event.deleteMany({});
    console.log('🧹 Cleared old data');

    // --- STEP 1: Seed Users ---
    const users = mockUsers.map(u => ({
      id: u._id,
      username: u.username,
      name: u.name,
      email: u.email,
      isAdmin: u.isAdmin,
      gaveLocationPermission: u.gaveLocationPermission,
      location: u.location || [],
      followers: u.followers,   // String IDs
      following: u.following    // String IDs
    }));
    await User.insertMany(users);
    console.log(`👤 Inserted ${users.length} users`);

    // --- STEP 2: Seed Comments ---
    const comments = mockComments.map(c => ({
      id: c._id,
      text: c.text,
      poster: c.poster,     // String ID
      eventId: c.eventId,
      isPinned: c.isPinned
    }));
    await Comment.insertMany(comments);
    console.log(`💬 Inserted ${comments.length} comments`);

    // --- STEP 3: Seed Events ---
    const events = mockEvents.map(e => ({
      id: e.id,
      name: e.name,
      date: e.date,
      price: e.price,
      location: e.location,
      description: e.description,
      ageGroup: e.ageGroup,
      category: e.category,
      host: e.host,                // String ID
      photos: e.photos,
      interestedIn: e.interestedIn, // String IDs
      vouchers: e.vouchers,         // String IDs
      comments: e.comments          // String IDs
    }));
    await Event.insertMany(events);
    console.log(`🎉 Inserted ${events.length} events`);

    console.log('✅ Database seeding complete!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
};

seedDB();
