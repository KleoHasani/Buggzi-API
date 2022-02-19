const { deleteSessionsService } = require("../services/sessions.service");
const { createUserService, deleteUserService, updateUserService } = require("../services/users.service");

/**
 * Register user.
 * @param {Request} req
 * @param {Response} res
 */
async function registerUserController(req, res) {
  const { username, password } = req.body;
  let apiResponse = null;

  try {
    // Create user in database.
    await createUserService(username, password);

    // Create user created response.
    apiResponse = console.response(201, "User created");
  } catch (err) {
    // Create conflict response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Delete user.
 * @param {Request} req
 * @param {Response} res
 */
async function deleteUserController(req, res) {
  let apiResponse = null;

  try {
    // Delete sessions by userID.
    await deleteSessionsService(req.user.userID);
    // Delete user by userID.
    await deleteUserService(req.user.userID);

    // Create user deleted response.
    apiResponse = console.response(200, "User deleted");
  } catch (err) {
    // Create conflict response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Delete user.
 * @param {Request} req
 * @param {Response} res
 */
async function updateUserController(req, res) {
  const { password } = req.body;
  let apiResponse = null;

  try {
    await updateUserService(req.user.userID, password);
    // Create user updated response.
    apiResponse = console.response(200, "User updated");
  } catch (err) {
    // Create conflict response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

module.exports = { registerUserController, deleteUserController, updateUserController };
