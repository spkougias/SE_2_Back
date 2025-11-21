import Event from '../models/Event.js';
import Comment from '../models/Comment.js';
import { mockEvents, mockComments } from '../utils/mockData.js';
import { getMockModeStatus } from '../config/db.js';
import { sendResponse } from '../utils/responseHandler.js';

// Helper to safely get string ID (handles MongoDB ObjectId vs String)
const getStringId = (id) => (id ? id.toString() : null);

// --- 1. GET Single Event (With Embedded & Sorted Comments) ---
export const getEventById = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    let event;
    let comments = [];

    if (getMockModeStatus()) {
      const foundEvent = mockEvents.find(e => e.id === parseInt(eventid));
      if (!foundEvent) return sendResponse(res, 404, false, null, 'Event not found');
      
      event = { ...foundEvent }; // Clone
      comments = mockComments.filter(c => event.comments.includes(c._id));
    } else {
      event = await Event.findOne({ id: eventid }).lean();
      if (!event) return sendResponse(res, 404, false, null, 'Event not found');

      if (event.comments && event.comments.length > 0) {
          comments = await Comment.find({ _id: { $in: event.comments } }).lean();
      }
    }

    // Sort: Pinned first
    comments.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

    event.commentsData = comments;
    return sendResponse(res, 200, true, event, 'Event retrieved with comments');
  } catch (error) {
    next(error);
  }
};

// --- 2. POST Create Event ---
export const createEvent = async (req, res, next) => {
  try {
    // REVERTED: Accept 'host' from body
    const { name, date, price, location, description, category, host } = req.body;
    
    // Fallback: If body host is missing, try to use logged-in user
    let finalHostId = host;
    if (!finalHostId && req.user) {
        finalHostId = getStringId(req.user._id);
    }

    if (!name || !finalHostId || !date) {
      return sendResponse(res, 400, false, null, 'Name, Date and Host are required');
    }

    const newEventData = {
      id: Math.floor(Math.random() * 1000),
      name,
      date: new Date(date),
      price,
      location,
      description,
      category,
      host: finalHostId, 
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

// --- 3. PUT Update Event ---
export const updateEvent = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    const updates = req.body;
    const currentUser = req.user;

    if (!currentUser) return sendResponse(res, 401, false, null, 'Authentication required');

    let event;
    if (getMockModeStatus()) {
      event = mockEvents.find(e => e.id === parseInt(eventid));
    } else {
      event = await Event.findOne({ id: eventid });
    }

    if (!event) return sendResponse(res, 404, false, null, 'Event not found');

    // Security Check: Must be Host or Admin
    const currentUserId = getStringId(currentUser._id);
    const eventHostId = getStringId(event.host);
    
    if (eventHostId !== currentUserId && !currentUser.isAdmin) {
        return sendResponse(res, 403, false, null, 'Permission Denied: Only Host can edit');
    }

    if (getMockModeStatus()) {
       Object.assign(event, updates);
       return sendResponse(res, 200, true, event, 'Event updated (Mock)');
    } else {
       Object.assign(event, updates);
       await event.save();
       return sendResponse(res, 200, true, event, 'Event updated (DB)');
    }
  } catch (error) {
    next(error);
  }
};

// --- 4. DELETE Event ---
export const deleteEvent = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    const { confirmed } = req.query;
    const currentUser = req.user;
    
    if (!currentUser) return sendResponse(res, 401, false, null, 'Authentication required');

    if (confirmed !== 'true') {
      console.log(`⚠️ Deleting event ${eventid} without explicit confirmation flag.`);
    }

    let eventHostId = "";
    if(getMockModeStatus()) {
        const e = mockEvents.find(ev => ev.id === parseInt(eventid));
        if(!e) return sendResponse(res, 404, false, null, 'Event not found');
        eventHostId = getStringId(e.host);
    } else {
        const e = await Event.findOne({ id: eventid });
        if(!e) return sendResponse(res, 404, false, null, 'Event not found');
        eventHostId = getStringId(e.host);
    }

    const currentUserId = getStringId(currentUser._id);
    // Security Check: Host or Admin
    if (eventHostId !== currentUserId && !currentUser.isAdmin) {
            return sendResponse(res, 403, false, null, 'Permission Denied: Only Host or Admin can delete event');
    }

    if (getMockModeStatus()) {
      const index = mockEvents.findIndex(e => e.id === parseInt(eventid));
      mockEvents.splice(index, 1);
      return sendResponse(res, 204, true, null, 'Event deleted (Mock)');
    } else {
      await Event.findOneAndDelete({ id: eventid });
      return sendResponse(res, 204, true, null, 'Event deleted (DB)');
    }
  } catch (error) {
    next(error);
  }
};

// --- 5. PUT Interested In ---
export const toggleInterest = async (req, res, next) => {
  try {
    const { eventid } = req.params;
    // REVERTED: Check body first, then req.user
    let userId = req.body.userId;
    if (!userId && req.user) {
        userId = getStringId(req.user._id);
    }

    if(!userId) return sendResponse(res, 400, false, null, 'User ID required');

    if (getMockModeStatus()) {
      const event = mockEvents.find(e => e.id === parseInt(eventid));
      if (!event) return sendResponse(res, 404, false, null, 'Event not found');

      const idx = event.interestedIn.indexOf(userId);
      if (idx > -1) {
        event.interestedIn.splice(idx, 1); 
      } else {
        event.interestedIn.push(userId); 
      }
      return sendResponse(res, 200, true, event.interestedIn, 'Interest toggled (Mock)');
    } else {
        return sendResponse(res, 200, true, null, 'DB Logic for toggle interest placeholder');
    }
  } catch (error) {
    next(error);
  }
};

// --- 6. POST Add Comment ---
export const addComment = async (req, res, next) => {
    try {
        const { eventid } = req.params;
        const { text, username } = req.body;
        
        let posterId = username;
        if (!posterId && req.user) {
            posterId = getStringId(req.user._id);
        }

        if(!posterId) return sendResponse(res, 400, false, null, 'Poster ID (username) required');

        const newCommentData = {
            text,
            poster: posterId, 
            eventId: parseInt(eventid),
            isPinned: false
        };

        if(getMockModeStatus()) {
             newCommentData._id = "c" + Math.floor(Math.random() * 10000);
             mockComments.push(newCommentData);
             const event = mockEvents.find(e => e.id === parseInt(eventid));
             if(event) event.comments.push(newCommentData._id);
             return sendResponse(res, 201, true, newCommentData, "Comment added (Mock)");
        } else {
             const comment = await Comment.create(newCommentData);
             await Event.findOneAndUpdate({id: eventid}, { $push: { comments: comment._id }});
             return sendResponse(res, 201, true, comment, "Comment added (DB)");
        }
    } catch (error) {
        next(error);
    }
};

// --- 7. DELETE Comment ---
export const deleteComment = async (req, res, next) => {
    try {
        const { eventid, commentid } = req.params;
        const currentUser = req.user;

        if (!currentUser) return sendResponse(res, 401, false, null, 'Authentication required');

        let comment, event;
        if(getMockModeStatus()) {
            comment = mockComments.find(c => c._id === commentid);
            event = mockEvents.find(e => e.id === parseInt(eventid));
        } else {
            comment = await Comment.findById(commentid);
            event = await Event.findOne({ id: eventid });
        }

        if (!comment || !event) return sendResponse(res, 404, false, null, 'Comment or Event not found');

        const currentUserId = getStringId(currentUser._id);
        const commentPosterId = getStringId(comment.poster);
        const eventHostId = getStringId(event.host);
        const isAdmin = currentUser.isAdmin;

        const isAuthor = commentPosterId === currentUserId;
        const isHost = eventHostId === currentUserId;

        if (!isAuthor && !isHost && !isAdmin) {
            return sendResponse(res, 403, false, null, 'Permission Denied: You cannot delete this comment');
        }

        if(getMockModeStatus()) {
            const cIdx = mockComments.findIndex(c => c._id === commentid);
            mockComments.splice(cIdx, 1);
            const eIdx = event.comments.indexOf(commentid);
            if(eIdx > -1) event.comments.splice(eIdx, 1);
            return sendResponse(res, 204, true, null, 'Comment deleted (Mock)');
        } else {
            await Comment.findByIdAndDelete(commentid);
            await Event.findOneAndUpdate({id: eventid}, { $pull: { comments: commentid }});
            return sendResponse(res, 204, true, null, 'Comment deleted (DB)');
        }
    } catch (error) {
        next(error);
    }
};

// --- 8. PIN Comment ---
export const pinComment = async (req, res, next) => {
    try {
        const { eventid, commentid } = req.params;
        const currentUser = req.user;

        if (!currentUser) return sendResponse(res, 401, false, null, 'Authentication required');

        let event, comment;
        if(getMockModeStatus()) {
            event = mockEvents.find(e => e.id === parseInt(eventid));
            comment = mockComments.find(c => c._id === commentid);
        } else {
            event = await Event.findOne({ id: eventid });
            comment = await Comment.findById(commentid);
        }

        if (!event || !comment) return sendResponse(res, 404, false, null, 'Not found');

        const currentUserId = getStringId(currentUser._id);
        const eventHostId = getStringId(event.host);

        if (eventHostId !== currentUserId) {
            return sendResponse(res, 403, false, null, 'Permission Denied: Only Host can pin');
        }

        const newStatus = !comment.isPinned;

        if(getMockModeStatus()) {
            comment.isPinned = newStatus;
            return sendResponse(res, 200, true, comment, `Comment ${newStatus ? 'pinned' : 'unpinned'} (Mock)`);
        } else {
            comment.isPinned = newStatus;
            await comment.save();
            return sendResponse(res, 200, true, comment, `Comment ${newStatus ? 'pinned' : 'unpinned'} (DB)`);
        }
    } catch (error) {
        next(error);
    }
};

// --- 9. GET Recommended Events ---
export const getRecommendedEvents = async (req, res, next) => {
  try {
    const { username } = req.params;
    let recommended;
    
    if (getMockModeStatus()) {
       recommended = mockEvents.slice(0, 2);
    } else {
       recommended = await Event.find().limit(2);
    }
    
    return sendResponse(res, 200, true, recommended, `Recommended events for ${username || 'guest'}`);
  } catch (error) {
    next(error);
  }
};