const { Router } = require("express");
const { registerUserController, createSessionController } = require("../controllers/user.controller");
const { validateRegister, results, validateLogin } = require("../middleware/validator.middleware");

const router = Router();

/**
 * Register user.
 * POST /api/register
 */
router.post("/register", [validateRegister, results], registerUserController);

// Login
// POST /api/sessions
router.post("/sessions", [validateLogin, results], createSessionController);

// Current Session
// GET /api/sessions

// Logout
// DELETE /api/sessions

module.exports = router;
