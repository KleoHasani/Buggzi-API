const { createUserService, validateUserService } = require("../services/user.service");
const { createSessionService } = require("../services/session.service");
const { ACCESS, REFRESH, createToken } = require("../utils/token.util");

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
 * Login user/Create session.
 * @param {Request} req
 * @param {Response} res
 */
async function createSessionController(req, res) {
  const { username, password } = req.body;
  let apiResponse = null;
  try {
    // Validate user.
    const user = await validateUserService(username, password);

    // Create session.
    const session = await createSessionService(user.id, req.get("user-agent"));

    // Create tokens.
    const accessToken = createToken({ userID: user.id, sessionID: session.id }, ACCESS);
    const refreshTtoken = createToken({ userID: user.id, sessionID: session.id }, REFRESH);

    // Send tokens with header.
    res.setHeader("authorization", `Bearer ${accessToken}`);
    res.setHeader("x-refresh", refreshTtoken);

    // Create response.
    apiResponse = console.response(200, "Authenticated");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

// /**
//  * Get user/Get session.
//  * @param {Request} req
//  * @param {Response} res
//  */
// async function getSessionController(req, res) {}

// /**
//  * Logout user/Delete session.
//  * @param {Request} req
//  * @param {Response} res
//  */
// async function deleteSessionController(req, res) {}

module.exports = { registerUserController, createSessionController };
