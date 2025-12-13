import mongoose from 'mongoose';

let isMockMode = false;

/**
 * Connects to MongoDB. If connection fails or no URI is provided,
 * it sets the application to Mock Mode.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log('⚠️  No MONGO_URI found in .env. Switching to MOCK DATA mode.');
    isMockMode = true;
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected');
    isMockMode = false;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Switching to MOCK DATA mode due to connection failure.');
    isMockMode = true;
  }
};

/**
 * Closes the MongoDB connection gracefully.
 */
export const disconnectDB = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('🔌 MongoDB Disconnected');
    }
};

export const getMockModeStatus = () => isMockMode;
export default connectDB;
