const { Router } = require("express");
const { registerUserController, deleteUserController } = require("../controllers/users.controller");
const { validateRegister, results } = require("../middleware/validator.middleware");
const { authenticate } = require("../middleware/authenticate.middleware");

const router = Router();

/**
 * Register user.
 * POST /api/users
 */
router.post("/users", [validateRegister, results], registerUserController);

/**
 * Delete user.
 * DELETE /api/users
 */
router.delete("/users", authenticate, deleteUserController);

module.exports = router;
