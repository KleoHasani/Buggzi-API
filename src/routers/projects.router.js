const { Router } = require("express");

const { authenticate } = require("../middleware/authenticate.middleware");

const {
  createProjectController,
  deleteProjectController,
  updateProjectController,
} = require("../controllers/projects.controller");

const router = Router();

/**
 * Create new project.
 * POST /api/projects
 */
router.post("/projects", authenticate, createProjectController);

/**
 * Delete project.
 * DELETE /api/projects
 */
router.delete("/projects", authenticate, deleteProjectController);

/**
 * Update project.
 * DELETE /api/projects
 */
router.patch("/projects", authenticate, updateProjectController);

module.exports = router;
