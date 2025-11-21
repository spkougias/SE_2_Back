import mongoose from 'mongoose';
import User from '../models/User.js';
import { mockUsers } from '../utils/mockData.js';
import { getMockModeStatus } from '../config/db.js';
import { sendResponse } from '../utils/responseHandler.js';

/**
 * Authentication Middleware
 * Looks for 'x-username' header to simulate a logged-in session.
 * Accepts either a Username OR a User ID in this header.
 * Attaches the found user to req.user.
 */
export const authenticateUser = async (req, res, next) => {
  // We use the header 'x-username' for backwards compatibility, 
  // but treating it as a generic identifier (Username or ID)
  const identifier = req.headers['x-username'];

  if (!identifier) {
    // If no header is present, we treat it as a Guest
    req.user = null;
    return next();
  }

  try {
    let user;
    if (getMockModeStatus()) {
      // MOCK MODE: Check if identifier matches username OR _id
      user = mockUsers.find(u => u.username === identifier || u._id === identifier);
    } else {
      // DB MODE: 
      // 1. Try to find by username
      user = await User.findOne({ username: identifier });

      // 2. If not found, check if identifier is a valid ObjectId and try finding by ID
      if (!user && mongoose.isValidObjectId(identifier)) {
        user = await User.findById(identifier);
      }
    }

    if (!user) {
      // If header provided but user not found, strictly fail
      return sendResponse(res, 401, false, null, 'User authenticating not found');
    }

    req.user = user;
    next();
  } catch (error) {
    return sendResponse(res, 500, false, null, 'Auth Error', error.message);
  }
};

/**
 * Middleware to ensure a user is logged in
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return sendResponse(res, 401, false, null, 'Authentication required. Please provide x-username header.');
  }
  next();
};