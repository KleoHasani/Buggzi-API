const {
  createTicketService,
  getTicketService,
  getAllTicketService,
  deleteAllTicketService,
  deleteTicketService,
  updateTicketService,
} = require("../services/tickets.service");

/**
 * Get all tickets by (projectID).
 * @param {Request} req
 * @param {Response} res
 */
async function getAllTicketController(req, res) {
  const { projectID } = req.body;
  let apiResponse = null;
  try {
    // Create project.
    const tickets = await getAllTicketService(projectID);
    // Create response.
    apiResponse = console.response(200, null, tickets);
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Get all tickets by (projectID).
 * @param {Request} req
 * @param {Response} res
 */
async function getTicketController(req, res) {
  const { ticketID } = req.body;
  let apiResponse = null;
  try {
    // Create project.
    const ticket = await getTicketService(ticketID);
    // Create response.
    apiResponse = console.response(200, null, ticket);
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Create ticket controller identifiable by (projectID, userID).
 * @param {Request} req
 * @param {Response} res
 */
async function createTicketController(req, res) {
  const { projectID, name, description, status } = req.body;
  let apiResponse = null;
  try {
    // Create project.
    await createTicketService({ projectID, userID: req.user.userID, name, description, status });
    // Create response.
    apiResponse = console.response(200, "Ticket created");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Delete all tickets by (projectID).
 * @param {Request} req
 * @param {Response} res
 */
async function deleteAllTicketController(req, res) {
  const { projectID } = req.body;
  let apiResponse = null;
  try {
    // Delete all tickets.
    await deleteAllTicketService(projectID);
    // Create response.
    apiResponse = console.response(200, "Tickets deleted");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Delete ticket by (ticketID).
 * @param {Request} req
 * @param {Response} res
 */
async function deleteTicketController(req, res) {
  const { ticketID } = req.body;
  let apiResponse = null;
  try {
    // Delete all tickets.
    await deleteTicketService(ticketID);
    // Create response.
    apiResponse = console.response(200, "Ticket deleted");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Update ticket by (ticketID).
 * @param {Request} req
 * @param {Response} res
 */
async function updateTicketController(req, res) {
  const { ticketID, name, description, status, assigned } = req.body;
  let apiResponse = null;
  try {
    // Delete all tickets.
    await updateTicketService(ticketID, { name, description, status, assigned });
    // Create response.
    apiResponse = console.response(200, "Ticket updated");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

module.exports = {
  getAllTicketController,
  getTicketController,
  createTicketController,
  deleteAllTicketController,
  deleteTicketController,
  updateTicketController,
};
