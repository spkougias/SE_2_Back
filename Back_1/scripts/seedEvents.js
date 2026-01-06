import mongoose from 'mongoose';
import Event from '../models/Event.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing collection
        await Event.deleteMany({});
        console.log('🧹 Cleared old data');

        // --- Seed Events ---
        const categories = ['Party','Concert','Bazaar','Movie Night','Competition','Workshop','Food Event','Other'];
        const ageGroups = ['Everyone','Teens','Adults'];

        const events = [];
        for (let i = 1; i <= 100; i++) {
            events.push({
                id: i,
                name: `Event ${i}`,
                host: `Host-${i}`,
                description: `NFR Test event ${i} for 100 event limit.`,
                date: new Date(),
                price: i,
                location: [40.6 + i, 22.9 + i/2],
                category: [categories[i % categories.length]], 
                ageGroup: [ageGroups[i % ageGroups.length]],
                photos: [],
                interestedIn: [],
                vouchers: [],
                comments: []
            });
        }

        await Event.insertMany(events);
        console.log(`🎉 Inserted ${events.length} events`);
        console.log('✅ Database seeding complete!');
    } catch (error) {
        console.error('❌ Seeding error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

seedEvents();
