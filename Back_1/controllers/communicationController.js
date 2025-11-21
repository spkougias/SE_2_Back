import { sendResponse } from '../utils/responseHandler.js';

/**
 * @controller CommunicationController
 * @desc       Handles Email and Notification logic as per CD-6
 */

// --- Matches CD-6: EmailSender ---
export const sendEmail = async (req, res, next) => {
  try {
    const { text, receivers } = req.body; // Receivers list matches CD-6 attribute

    if (!text) {
      return sendResponse(res, 400, false, null, 'Email text is required');
    }

    // Mock sending email
    console.log(`📧 SENDING EMAIL`);
    console.log(`   To: ${receivers || 'All Users'}`);
    console.log(`   Content: ${text}`);

    return sendResponse(res, 201, true, null, 'Email sent successfully');
  } catch (error) {
    next(error);
  }
};

// --- Matches CD-6: NotificationSender ---
export const sendNotification = async (req, res, next) => {
  try {
    const { text, eventId, receivers } = req.body;

    if (!text) {
      return sendResponse(res, 400, false, null, 'Notification text is required');
    }

    // Mock sending notification
    console.log(`🔔 SENDING NOTIFICATION`);
    console.log(`   Context: Event ${eventId || 'General'}`);
    console.log(`   To: ${receivers || 'Subscribers'}`);
    console.log(`   Message: ${text}`);

    return sendResponse(res, 201, true, null, 'Notification sent successfully');
  } catch (error) {
    next(error);
  }
};