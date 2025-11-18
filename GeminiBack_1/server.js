import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 8080;

// Start Database Connection (Will fallback to Mock if fails)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
      🚀 Server running on port ${PORT}
      Documentation: http://localhost:${PORT}/
      Mode: ${process.env.MONGO_URI ? 'Database Attempt' : 'Mock Data Forced'}
    `);
  });
});