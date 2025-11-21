import Event from '../models/Event.js';
import User from '../models/User.js';
import { mockEvents, mockUsers } from '../utils/mockData.js';
import { getMockModeStatus } from '../config/db.js';
import { sendResponse } from '../utils/responseHandler.js';

/**
 * @desc    Search for Events and/or Users
 * @route   GET /search
 * @access  Public
 * @param   {string} searchText - Text to match against names/descriptions
 * @param   {string} type - 'user', 'event', or undefined (returns both)
 * @param   {string} category - Filter for events
 * @param   {string} ageGroup - Filter for events
 */
export const search = async (req, res, next) => {
  try {
    const { searchText, type, category, ageGroup } = req.query;
    
    let results = {
      users: [],
      events: []
    };

    // Determine what to search based on 'type' query param
    const searchUsers = !type || type === 'user';
    const searchEvents = !type || type === 'event';

    if (getMockModeStatus()) {
      // --- MOCK DATA LOGIC ---
      
      if (searchUsers) {
        results.users = mockUsers.filter(u => {
          if (!searchText) return true;
          return u.name.toLowerCase().includes(searchText.toLowerCase()) || 
                 u.username.toLowerCase().includes(searchText.toLowerCase());
        });
      }

      if (searchEvents) {
        results.events = mockEvents.filter(e => {
          let match = true;
          if (searchText) {
            match = match && (e.name.toLowerCase().includes(searchText.toLowerCase()) || 
                              e.description.toLowerCase().includes(searchText.toLowerCase()));
          }
          if (category) match = match && e.category === category;
          if (ageGroup) match = match && e.ageGroup === ageGroup;
          return match;
        });
      }

    } else {
      // --- MONGODB LOGIC ---

      if (searchUsers) {
        const userQuery = {};
        if (searchText) {
          userQuery.$or = [
            { name: { $regex: searchText, $options: 'i' } },
            { username: { $regex: searchText, $options: 'i' } }
          ];
        }
        results.users = await User.find(userQuery);
      }

      if (searchEvents) {
        const eventQuery = {};
        if (searchText) {
          eventQuery.$or = [
            { name: { $regex: searchText, $options: 'i' } },
            { description: { $regex: searchText, $options: 'i' } }
          ];
        }
        if (category) eventQuery.category = category;
        if (ageGroup) eventQuery.ageGroup = ageGroup;
        results.events = await Event.find(eventQuery);
      }
    }

    // Format response based on what was requested
    if (type === 'user') {
      return sendResponse(res, 200, true, results.users, 'User search results');
    } else if (type === 'event') {
      return sendResponse(res, 200, true, results.events, 'Event search results');
    } else {
      // Return combined object if no type specified
      return sendResponse(res, 200, true, results, 'Combined search results');
    }

  } catch (error) {
    next(error);
  }
};