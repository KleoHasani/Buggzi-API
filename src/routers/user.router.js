const { Router } = require("express");
const { registerUserController, createSessionController } = require("../controllers/user.controller");
const { validateRegister, results, validateLogin } = require("../middleware/validator.middleware");
const { authenticate } = require("../middleware/authenticate.middleware");

const router = Router();

/**
 * Register user.
 * POST /api/register
 */
router.post("/register", [validateRegister, results], registerUserController);

/**
 * Login
 * POST /api/sessions
 */
router.post("/sessions", [validateLogin, results], createSessionController);

/**
 * Current Session
 * GET /api/sessions
 */
router.get("/sessions", authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).json({ hello: "world" });
});

// Logout
// DELETE /api/sessions

module.exports = router;
