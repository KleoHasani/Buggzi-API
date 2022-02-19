const { createProjectService, deleteProjectService, updateProjectService } = require("../services/projects.service");

/**
 * Create project controller identifiable by (userID).
 * @param {Request} req
 * @param {Response} res
 */
async function createProjectController(req, res) {
  const { name, description } = req.body;
  let apiResponse = null;
  try {
    // Create project.
    await createProjectService(req.user.userID, name, description);
    // Create response.
    apiResponse = console.response(200, "Project created");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Delete project controller identifiable by (projectID and userID).
 * @param {Request} req
 * @param {Response} res
 */
async function deleteProjectController(req, res) {
  const { projectID } = req.body;
  let apiResponse = null;
  try {
    // Delete project.
    await deleteProjectService(projectID, req.user.userID);
    // Create response.
    apiResponse = console.response(200, "Project deleted");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Update project controller identifiable by (projectID and userID).
 * @param {Request} req
 * @param {Response} res
 */
async function updateProjectController(req, res) {
  // FIXME: Update project does not update DB.
  const { projectID, name, description } = req.body;
  let apiResponse = null;
  try {
    // Update project.
    await updateProjectService({ projectID, userID: req.user.userID }, { name, description });
    // Create response.
    apiResponse = console.response(200, "Project updated");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

module.exports = { createProjectController, deleteProjectController, updateProjectController };
