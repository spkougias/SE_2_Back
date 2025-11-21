import User from '../models/User.js';
import { mockUsers } from '../utils/mockData.js';
import { getMockModeStatus } from '../config/db.js';
import { sendResponse } from '../utils/responseHandler.js';

// --- GET User Profile ---
export const getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    let user;

    if (getMockModeStatus()) {
      user = mockUsers.find(u => u.username === username);
    } else {
      user = await User.findOne({ username });
    }

    if (!user) return sendResponse(res, 404, false, null, 'User not found');
    return sendResponse(res, 200, true, user, 'User retrieved');
  } catch (error) {
    next(error);
  }
};

// --- PUT Follow User ---
export const followUser = async (req, res, next) => {
  try {
    const { username } = req.params; 
    const currentUsername = req.user ? req.user.username : req.body.currentUsername; 

    if (!currentUsername) return sendResponse(res, 401, false, null, 'Authentication required');

    if (getMockModeStatus()) {
      const targetUser = mockUsers.find(u => u.username === username);
      const currentUser = mockUsers.find(u => u.username === currentUsername);

      if (!targetUser || !currentUser) return sendResponse(res, 404, false, null, 'User not found');

      const idx = currentUser.following.indexOf(targetUser._id);
      if (idx > -1) {
        currentUser.following.splice(idx, 1);
        const fIdx = targetUser.followers.indexOf(currentUser._id);
        targetUser.followers.splice(fIdx, 1);
        return sendResponse(res, 200, true, null, 'Unfollowed (Mock)');
      } else {
        currentUser.following.push(targetUser._id);
        targetUser.followers.push(currentUser._id);
        return sendResponse(res, 200, true, null, 'Followed (Mock)');
      }
    } else {
      return sendResponse(res, 200, true, null, 'Follow logic for DB placeholder');
    }
  } catch (error) {
    next(error);
  }
};

// --- PUT Restrict User (Security: Admin Only) ---
export const restrictUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { username } = req.params; 

    if (!currentUser || !currentUser.isAdmin) {
       return sendResponse(res, 403, false, null, 'Permission Denied: Only Admin can restrict users');
    }

    console.log(`🔨 RESTRICTING USER: ${username} by Admin: ${currentUser.username}`);
    return sendResponse(res, 200, true, null, `User ${username} restricted successfully`);
  } catch (error) {
    next(error);
  }
};

// --- PUT Ban User (Security: Admin Only) ---
export const banUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { username } = req.params; 

    if (!currentUser || !currentUser.isAdmin) {
       return sendResponse(res, 403, false, null, 'Permission Denied: Only Admin can ban users');
    }

    console.log(`🚫 BANNING USER: ${username} by Admin: ${currentUser.username}`);
    return sendResponse(res, 200, true, null, `User ${username} banned successfully`);
  } catch (error) {
    next(error);
  }
};