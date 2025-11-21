import User from '../models/User.js';
import { mockUsers } from '../utils/mockData.js';
import { getMockModeStatus } from '../config/db.js';
import { sendResponse } from '../utils/responseHandler.js';

// --- 8. GET User Profile ---
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

// --- 9. PUT Follow User ---
export const followUser = async (req, res, next) => {
  try {
    const { username } = req.params; // The user to be followed
    const { currentUsername } = req.body; // The user performing the action

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
      // DB Logic Placeholder
      return sendResponse(res, 200, true, null, 'Follow logic for DB placeholder');
    }
  } catch (error) {
    next(error);
  }
};