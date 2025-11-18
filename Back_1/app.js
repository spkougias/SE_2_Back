import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging

// Mount Routes
// Prefixing with /api/v1 is standard practice
app.use('/', router); 

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Middleware
app.use(errorHandler);

export default app;