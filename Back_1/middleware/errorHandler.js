import { sendResponse } from '../utils/responseHandler.js';

/**
 * Centralized Error Handler Middleware
 */
export const errorHandler = (err, _req, res, _next) => {
  console.error(`❌ Error: ${err.message}`);
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return sendResponse(res, 400, false, null, 'Validation Error', messages);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return sendResponse(res, 400, false, null, 'Duplicate field value entered', err);
  }

  return sendResponse(res, 500, false, null, 'Server Error', err.message);
};