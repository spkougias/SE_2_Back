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
export const toggleFollow = async (req, res, next) => {
  try {
    const { username: targetUsername } = req.params; 
    const currentUser = req.user; 

    if (!currentUser) return sendResponse(res, 401, false, null, 'Authentication required');
    const currentUserId = currentUser.id;

    if (getMockModeStatus()) {
      const targetUser = mockUsers.find(u => u.username === targetUsername);
      const followerUser = mockUsers.find(u => u.id === currentUserId);

      if (!targetUser || !followerUser) return sendResponse(res, 404, false, null, 'User not found');

      // Check if already following (using user ID)
      const isFollowing = followerUser.following.includes(targetUser.id);
      if (isFollowing) {
        followerUser.following = followerUser.following.filter(id => id !== targetUser.id);
        targetUser.followers = targetUser.followers.filter(id => id !== currentUserId);
        return sendResponse(res, 200, true, null, 'Unfollowed (Mock)');
      } else {
        followerUser.following.push(targetUser.id);
        targetUser.followers.push(currentUserId);
        return sendResponse(res, 200, true, null, 'Followed (Mock)');
      }
    } else {
      const targetUser = await User.findOne({ username: targetUsername });
      const followerUser = await User.findOne({ id: currentUserId });

      if (!targetUser || !followerUser) return sendResponse(res, 404, false, null, 'User not found');

      const isFollowing = followerUser.following.includes(targetUser.id);
      const targetUserId = targetUser.id;

      if (isFollowing) {
        await User.updateOne({ id: currentUserId }, { $pull: { following: targetUserId } });
        await User.updateOne({ username: targetUsername }, { $pull: { followers: currentUserId } });
        return sendResponse(res, 200, true, { followed: false }, 'Unfollowed (DB)');
      } else {
        await User.updateOne({ id: currentUserId }, { $push: { following: targetUserId } });
        await User.updateOne({ username: targetUsername }, { $push: { followers: currentUserId } });
        return sendResponse(res, 200, true, { followed: true }, 'Followed (DB)');
      }
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
    
    if (getMockModeStatus()) {
        const user = mockUsers.find(u => u.username === username);
        if (user) user.isRestricted = true;
    } else {
        await User.updateOne({ username }, { isRestricted: true });
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

    if (getMockModeStatus()) {
        const user = mockUsers.find(u => u.username === username);
        if (user) user.isBanned = true;
    } else {
        await User.updateOne({ username }, { isBanned: true });
    }
    
    console.log(`🚫 BANNING USER: ${username} by Admin: ${currentUser.username}`);
    return sendResponse(res, 200, true, null, `User ${username} banned successfully`);
  } catch (error) {
    next(error);
  }
};
