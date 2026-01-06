import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

const PORT = process.env.PORT || 8080;

// Start Database Connection (Will fallback to Mock if fails)
// Do NOT connect to DB during tests
const startServer = () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  connectDB()
    .then(() => startServer())
    .catch((err) => {
      console.error("DB Connection failed, starting in Mock Mode...", err.message);
      startServer();
    });
}
