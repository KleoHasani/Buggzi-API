const { Router } = require("express");
const { authenticate } = require("../middleware/authenticate.middleware");

const {
  getAllTicketController,
  getTicketController,
  createTicketController,
  deleteAllTicketController,
  deleteTicketController,
  updateTicketController,
} = require("../controllers/tickets.controller");

const router = Router();

/**
 * Get ticket by (ticketID).
 * GET /api/ticket
 */
router.get("/ticket", authenticate, getTicketController);

/**
 * Get all tickets.
 * GET /api/tickets
 */
router.get("/tickets", authenticate, getAllTicketController);

/**
 * Create new ticket.
 * POST /api/tickets
 */
router.post("/tickets", authenticate, createTicketController);

/**
 * Delte all tickets.
 * DELETE /api/tickets
 */
router.delete("/tickets", authenticate, deleteAllTicketController);

/**
 * Delte ticket.
 * DELETE /api/ticket
 */
router.delete("/ticket", authenticate, deleteTicketController);

/**
 * Update ticket.
 * PATCH /api/tickets
 */
router.patch("/tickets", authenticate, updateTicketController);

module.exports = router;
