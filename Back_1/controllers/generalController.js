import { sendResponse } from '../utils/responseHandler.js';

// --- 10. POST Report ---
export const createReport = async (req, res, next) => {
  try {
    const { sender, reportedUser, text } = req.body;
    
    // In a real app, save to DB. Here we just acknowledge.
    console.log(`REPORT: User ${sender} reported ${reportedUser}: ${text}`);

    return sendResponse(res, 201, true, { id: 999, status: 'received' }, 'Report received successfully');
  } catch (error) {
    next(error);
  }
};