import Event from '../models/Event.js';
import { mockEvents, mockComments } from '../utils/mockData.js';
import { getMockModeStatus } from '../config/db.js';
import { sendResponse } from '../utils/responseHandler.js';

// --- 1. GET All Events (Search/Filter) ---
export const getEvents = async (req, res, next) => {
  try {
    const { searchText, category, ageGroup } = req.query;
    let events;

    if (getMockModeStatus()) {
      // Mock Logic
      events = mockEvents.filter(e => {
        let match = true;
        if (searchText) match = match && e.name.toLowerCase().includes(searchText.toLowerCase());
        if (category) match = match && e.category === category;
        if (ageGroup) match = match && e.ageGroup === ageGroup;
        return match;
      });
    } else {
      // DB Logic
      const query = {};
      if (searchText) query.name = { $regex: searchText, $options: 'i' };
      if (category) query.category = category;
      if (ageGroup) query.ageGroup = ageGroup;
      events = await Event.find(query);
    }

    return sendResponse(res, 200, true, events, 'Events retrieved successfully');
  } catch (error) {
    next(error);
  }
};

// --- 2. GET Single Event ---
export const getEventById = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    let event;

    if (getMockModeStatus()) {
      event = mockEvents.find(e => e.id === parseInt(eventid));
    } else {
      event = await Event.findOne({ id: eventid });
    }

    if (!event) return sendResponse(res, 404, false, null, 'Event not found');
    return sendResponse(res, 200, true, event, 'Event retrieved');
  } catch (error) {
    next(error);
  }
};

// --- 3. POST Create Event ---
export const createEvent = async (req, res, next) => {
  try {
    const { name, date, price, location, description, category, host } = req.body;
    
    // Basic validation
    if (!name || !host || !date) {
      return sendResponse(res, 400, false, null, 'Name, Date and Host are required');
    }

    const newEventData = {
      id: Math.floor(Math.random() * 10000), // Random ID for demo
      name,
      date: new Date(date),
      price,
      location,
      description,
      category,
      host,
      interestedIn: [],
      comments: []
    };

    if (getMockModeStatus()) {
      mockEvents.push(newEventData);
      return sendResponse(res, 201, true, newEventData, 'Event created (Mock)');
    } else {
      const newEvent = await Event.create(newEventData);
      return sendResponse(res, 201, true, newEvent, 'Event created (DB)');
    }
  } catch (error) {
    next(error);
  }
};

// --- 4. PUT Update Event ---
export const updateEvent = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    const updates = req.body;

    if (getMockModeStatus()) {
      const index = mockEvents.findIndex(e => e.id === parseInt(eventid));
      if (index === -1) return sendResponse(res, 404, false, null, 'Event not found');
      
      mockEvents[index] = { ...mockEvents[index], ...updates };
      return sendResponse(res, 200, true, mockEvents[index], 'Event updated (Mock)');
    } else {
      const event = await Event.findOneAndUpdate({ id: eventid }, updates, { new: true, runValidators: true });
      if (!event) return sendResponse(res, 404, false, null, 'Event not found');
      return sendResponse(res, 200, true, event, 'Event updated (DB)');
    }
  } catch (error) {
    next(error);
  }
};

// --- 5. DELETE Event ---
export const deleteEvent = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    const { confirmed } = req.query;

    if (confirmed !== 'true') {
      return sendResponse(res, 400, false, null, 'Deletion not confirmed');
    }

    if (getMockModeStatus()) {
      const index = mockEvents.findIndex(e => e.id === parseInt(eventid));
      if (index === -1) return sendResponse(res, 404, false, null, 'Event not found');
      
      mockEvents.splice(index, 1);
      return sendResponse(res, 204, true, null, 'Event deleted (Mock)');
    } else {
      const event = await Event.findOneAndDelete({ id: eventid });
      if (!event) return sendResponse(res, 404, false, null, 'Event not found');
      return sendResponse(res, 204, true, null, 'Event deleted (DB)');
    }
  } catch (error) {
    next(error);
  }
};

// --- 6. PUT Interested In (Interaction) ---
export const toggleInterest = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    // Assume username comes from body or auth middleware (simplified here as query or body)
    const username = req.body.username || "spyros"; 

    if (getMockModeStatus()) {
      const event = mockEvents.find(e => e.id === parseInt(eventid));
      if (!event) return sendResponse(res, 404, false, null, 'Event not found');

      const idx = event.interestedIn.indexOf(username);
      if (idx > -1) {
        event.interestedIn.splice(idx, 1); // Un-interest
      } else {
        event.interestedIn.push(username); // Interest
      }
      return sendResponse(res, 200, true, event.interestedIn, 'Interest toggled (Mock)');
    } else {
        // DB logic simplified: would use $addToSet or $pull
        return sendResponse(res, 200, true, null, 'DB Logic for toggle interest placeholder');
    }
  } catch (error) {
    next(error);
  }
};

// --- 7. POST Add Comment ---
export const addComment = async (req, res, next) => {
    try {
        const { eventid } = req.params;
        const { text, username } = req.body;

        const newComment = {
            _id: "c" + Math.floor(Math.random() * 10000),
            text,
            poster: username,
            eventId: parseInt(eventid),
            isPinned: false
        };

        if(getMockModeStatus()) {
             mockComments.push(newComment);
             // Also add to event ref
             const event = mockEvents.find(e => e.id === parseInt(eventid));
             if(event) event.comments.push(newComment._id);
             return sendResponse(res, 201, true, newComment, "Comment added (Mock)");
        } else {
            // DB Logic
            return sendResponse(res, 201, true, newComment, "Comment added (Placeholder DB)");
        }
    } catch (error) {
        next(error);
    }
}