const { Router } = require("express");
const {
  registerUserController,
  deleteUserController,
  updateUserController,
} = require("../controllers/users.controller");
const { validateRegister, results } = require("../middleware/validator.middleware");
const { authenticate } = require("../middleware/authenticate.middleware");

const router = Router();

/**
 * Register user (Create new user).
 * POST /api/users
 */
router.post("/users", [validateRegister, results], registerUserController);

/**
 * Update user (password).
 * PATCH /api/users
 */
router.patch("/users", authenticate, updateUserController);

/**
 * Delete user.
 * DELETE /api/users
 */
router.delete("/users", authenticate, deleteUserController);

module.exports = router;
