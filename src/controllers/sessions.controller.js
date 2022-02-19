const { validateUserService } = require("../services/users.service");
const { createSessionService, deleteSessionService, deleteSessionsService } = require("../services/sessions.service");
const { createAccessToken, createRefreshToken } = require("../utils/token.util");

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
    const accessToken = createAccessToken(user.id, session.id);
    const refreshTtoken = createRefreshToken(session.id);

    // Send tokens with header.
    res.setHeader("authorization", accessToken);
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

// TODO: DELTE THIS.
// /**
//  * Get user/GET session.
//  * @param {Request} req
//  * @param {Response} res
//  */
// async function getSessionController(req, res) {
//   let apiResponse = null;
//   try {
//     // Get session.
//     const session = await getSessionService(req.user.sessionID);

//     // Check session is valid.
//     if (!session) throw new Error("Session does not exists.");

//     // Create response.
//     apiResponse = console.response(200, "Found session");
//   } catch (err) {
//     // Create conflic response.
//     apiResponse = console.response(409, err.message);
//   }

//   // Send response.
//   res.status(apiResponse.status).json(apiResponse);
// }

/**
 * Logout user/Delete session.
 * @param {Request} req
 * @param {Response} res
 */
async function deleteSessionController(req, res) {
  let apiResponse = null;
  try {
    // Delete session.
    await deleteSessionService(req.user.sessionID);
    // Create response.
    apiResponse = console.response(200, "Logged out");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

/**
 * Logout of all user sessions/Delete sessions.
 * @param {Request} req
 * @param {Response} res
 */
async function deleteSessionsController(req, res) {
  let apiResponse = null;
  try {
    await deleteSessionsService(req.user.userID);

    // Create response.
    apiResponse = console.response(200, "Logged out of all sessions");
  } catch (err) {
    // Create conflic response.
    apiResponse = console.response(409, err.message);
  }

  // Send response.
  res.status(apiResponse.status).json(apiResponse);
}

module.exports = { createSessionController, deleteSessionController, deleteSessionsController };
