/**
 * Standardized response handler
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {Boolean} success - Success status
 * @param {Object|Array|null} data - Payload
 * @param {String} message - Message to client
 * @param {Object|null} error - Error details
 */
export const sendResponse = (res, statusCode, success, data = null, message = '', error = null) => {
  const response = {
    success,
    message,
    data,
    ...(error && { error })
  };
  return res.status(statusCode).json(response);
};