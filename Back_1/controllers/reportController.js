import { sendResponse } from '../utils/responseHandler.js';

/**
 * @controller ReportController
 * @desc       Handles reporting logic as per CD-8
 */

// --- Matches CD-8: + sendReport(text: String): void ---
export const sendReport = async (req, res, next) => {
  try {
    const { sender, reportedUser, reportedEvent, text, associatedComment } = req.body;
    
    // Validation check (simplified)
    if (!sender || (!reportedUser && !reportedEvent)) {
      return sendResponse(res, 400, false, null, 'Report must have a sender and a target (user or event)');
    }

    // In a real app, save to DB. Here we log to console as per assignment scope.
    const target = reportedUser ? `User: ${reportedUser}` : `Event: ${reportedEvent}`;
    console.log(`📝 REPORT RECEIVED`);
    console.log(`   From: ${sender}`);
    console.log(`   Target: ${target}`);
    console.log(`   Reason: ${text}`);
    if (associatedComment) console.log(`   Comment ID: ${associatedComment}`);

    return sendResponse(res, 201, true, { id: Date.now(), status: 'received' }, 'Report sent successfully');
  } catch (error) {
    next(error);
  }
};