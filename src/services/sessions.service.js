const { SessionModel } = require("../models/session.model");

/**
 * Create a new session.
 * @param {string} userID
 * @param {string} agent
 * @returns {object}
 */
async function createSessionService(userID, agent) {
  try {
    return await SessionModel.create({ userID, agent });
  } catch {
    throw new Error("Unable to create a new session.");
  }
}

// /**
//  * Get current session by sessionID.
//  * @param {string} sessionID
//  * @returns {object}
//  */
// async function getSessionService(sessionID) {
//   try {
//     return await SessionModel.findById(sessionID);
//   } catch {
//     throw new Error("Unable to find session.");
//   }
// }

/**
 * Logout/Delete session by sessionID.
 * @param {string} sessionID
 * @returns {Promise<void>}
 */
async function deleteSessionService(sessionID) {
  try {
    await SessionModel.findByIdAndDelete(sessionID);
  } catch {
    throw new Error("Unable to delete session.");
  }
}

/**
 * Logout/Delete session by sessionID.
 * @param {string} sessionID
 * @returns {Promise<void>}
 */
async function deleteSessionsService(userID) {
  try {
    await SessionModel.deleteMany({ userID });
  } catch {
    throw new Error("Unable to delete sessions.");
  }
}

module.exports = { createSessionService, deleteSessionService, deleteSessionsService };
