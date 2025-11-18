import express from 'express';
import * as eventController from '../controllers/eventController.js';
import * as userController from '../controllers/userController.js';
import * as generalController from '../controllers/generalController.js';

const router = express.Router();

/**
 * @route   GET /search (Mapped to GET Events for simplicity in assignment)
 * @desc    Search events
 */
router.get('/search', eventController.getEvents);

/**
 * @route   POST /event
 * @desc    Create a new event
 */
router.post('/event', eventController.createEvent);

/**
 * @route   GET /event/:eventid
 * @desc    Get specific event
 */
router.get('/event/:eventid', eventController.getEventById);

/**
 * @route   PUT /event/:eventid
 * @desc    Update event
 */
router.put('/event/:eventid', eventController.updateEvent);

/**
 * @route   DELETE /event/:eventid
 * @desc    Delete event
 */
router.delete('/event/:eventid', eventController.deleteEvent);

/**
 * @route   PUT /event/:eventid/interested
 * @desc    Toggle interested status
 */
router.put('/event/:eventid/interested', eventController.toggleInterest);

/**
 * @route   POST /event/:eventid/comment
 * @desc    Add comment to event
 */
router.post('/event/:eventid/comment', eventController.addComment);

/**
 * @route   GET /user/:username
 * @desc    Get user profile
 */
router.get('/user/:username', userController.getUser);

/**
 * @route   PUT /user/:username/follow
 * @desc    Follow/Unfollow user
 */
router.put('/user/:username/follow', userController.followUser);

/**
 * @route   POST /report
 * @desc    Submit a report
 */
router.post('/report', generalController.createReport);

export default router;