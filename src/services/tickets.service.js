const { TicketModel } = require("../models/ticket.model");

/**
 * Get all tickets for project.
 * @param {string} projectID
 * @returns {[object]}
 */
async function getAllTicketService(projectID) {
  try {
    return await TicketModel.find({ projectID });
  } catch {
    throw new Error("Unable to get tickets.");
  }
}

/**
 * Get ticket by ticketID.
 * @param {string} ticketID
 * @returns {object}
 */
async function getTicketService(ticketID) {
  try {
    return await TicketModel.findById(ticketID);
  } catch {
    throw new Error("Unable to get tickets.");
  }
}

/**
 * Create a new project.
 * @param {object} d
 * @param {string} d.projectID
 * @param {string} d.userID
 * @param {string} d.name
 * @param {string} d.description
 * @param {number} d.status
 * @returns {void}
 */
async function createTicketService(d) {
  try {
    await TicketModel.create({
      projectID: d.projectID,
      userID: d.userID,
      name: d.name,
      description: d.description,
      status: d.status,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to create a new ticket.");
  }
}

/**
 * Delete all tickets.
 * @param {string} projectID
 * @returns {void}
 */
async function deleteAllTicketService(projectID) {
  try {
    await TicketModel.deleteMany({ projectID });
  } catch {
    throw new Error("Unable to delete tickets.");
  }
}

/**
 * Delete ticket.
 * @param {string} ticketID
 * @returns {void}
 */
async function deleteTicketService(ticketID) {
  try {
    await TicketModel.findByIdAndDelete(ticketID);
  } catch {
    throw new Error("Unable to delete ticket.");
  }
}
module.exports = {
  getAllTicketService,
  getTicketService,
  createTicketService,
  deleteAllTicketService,
  deleteTicketService,
};
