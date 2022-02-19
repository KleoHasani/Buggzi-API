/**
 * Generate a response to send.
 * @param {number} status
 * @param {string} message
 * @param {any} data
 * @returns {object}
 */
function response(status = 200, message = null, data = null) {
  return {
    status,
    message,
    data,
  };
}

console.response = response;
