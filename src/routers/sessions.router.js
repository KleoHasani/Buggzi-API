const { Router } = require("express");
const {
  createSessionController,
  deleteSessionController,
  deleteSessionsController,
} = require("../controllers/sessions.controller");
const { results, validateLogin } = require("../middleware/validator.middleware");
const { authenticate } = require("../middleware/authenticate.middleware");

const router = Router();

/**
 * .
 * POST /api/sessions
 */
router.post("/sessions", [validateLogin, results], createSessionController);

// /**
//  * Current Session.
//  * GET /api/sessions
//  */
// router.get("/sessions", authenticate, getSessionController);

/**
 * Logout.
 * DELETE /api/sessions
 */
router.delete("/sessions", authenticate, deleteSessionController);

/**
 * Logout of every session.
 * DELETE /api/sessions/logout
 */
router.delete("/sessions/logout", authenticate, deleteSessionsController);

module.exports = router;
