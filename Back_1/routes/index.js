import express from 'express';
import * as eventController from '../controllers/eventController.js';
import * as userController from '../controllers/userController.js';
import * as searchController from '../controllers/searchController.js';
import * as reportController from '../controllers/reportController.js';
import * as communicationController from '../controllers/communicationController.js';
import { authenticateUser, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Apply Auth Middleware to all routes
router.use(authenticateUser);

// --- SEARCH ---
router.get('/search', searchController.search);

// --- EVENT ROUTES ---
router.post('/event', requireAuth, eventController.createEvent);
router.get('/event/recommended/:username?', eventController.getRecommendedEvents); 
router.get('/event/:eventid', eventController.getEventById); 
router.put('/event/:eventid', requireAuth, eventController.updateEvent);
router.delete('/event/:eventid', requireAuth, eventController.deleteEvent);
router.put('/event/:eventid/interested', requireAuth, eventController.toggleInterest);
router.put('/event/:eventid/vouch', requireAuth, eventController.toggleVouch);
router.post('/event/:eventid/announcement', requireAuth, eventController.makeAnnouncement);

// Comment specific routes
router.post('/event/:eventid/comment', requireAuth, eventController.addComment);
router.delete('/event/:eventid/comment/:commentid', requireAuth, eventController.deleteComment);
router.put('/event/:eventid/comment/:commentid/pin', requireAuth, eventController.pinComment);

// --- USER ROUTES ---
router.get('/user/:username', userController.getUser);
router.put('/user/:username/follow', requireAuth, userController.toggleFollow);
router.put('/user/:username/restrict', requireAuth, userController.restrictUser);
router.put('/user/:username/ban', requireAuth, userController.banUser);

// --- REPORT ROUTE ---
router.post('/report', requireAuth, reportController.sendReport);

// --- COMMUNICATION ROUTES ---
router.post('/email', requireAuth, communicationController.sendEmail);
router.post('/notification', requireAuth, communicationController.sendNotification);

export default router;
