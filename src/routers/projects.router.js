const { Router } = require("express");

const { authenticate } = require("../middleware/authenticate.middleware");

const router = Router();

/**
 * Create new project.
 * POST /api/projects
 */
router.post("/projects", authenticate, (req, res) => {
  // TODO: Implement /projects endpoint.
  console.log("Got here by auth");
});

module.exports = router;