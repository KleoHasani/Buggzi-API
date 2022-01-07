const { verifyToken, deserializeToken, createAccessToken } = require("../utils/token.util");
const { SessionModel } = require("../models/session.model");
const { UserModel } = require("../models/user.model");

/**
 * Authenticate token middleware.
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
async function authenticate(req, res, next) {
  try {
    // Get tokens
    const authorizationToken = req.header("authorization").split(" ")[1];
    const xrefreshToken = req.header("x-refresh");

    // Check token is provided
    if (!(authorizationToken && xrefreshToken)) throw new Error("Missing token.", { cause: 400 });

    // Verify auth token.
    const auth = verifyToken(authorizationToken);

    // Check auth token is valid. If so, set it to req.user...
    if (auth.valid)
      // Set req.user...
      req.user = auth.data;

    // If access token is expired, reissue a new token.
    if (auth.expired) {
      // Verify refresh token.
      const ref = verifyToken(xrefreshToken);

      // Check that it is a valid token.
      if (!ref.valid) throw new Error("Invalid refresh token.", { cause: 401 });

      // Find session from refresh token.
      const session = await SessionModel.findById(ref.data.sessionID);

      // Check session is valid.
      if (!session) throw new Error("Invalid session.", { cause: 401 });

      // Get user data from access to ensure access token user and refresh token user match.
      const deserializeAccessToken = deserializeToken(authorizationToken);
      if (!deserializeAccessToken.id === session.userID)
        throw new Error("Bad session. Failed to match user.", { cause: 400 });

      // Fin user from session.
      const user = await UserModel.findById(session.userID);

      // Ensure user exists.
      if (!user) throw new Error("Bad session. User does not exist.", { cause: 400 });

      // Resign new access token.
      const reAuthorizationToken = createAccessToken(user.id, session.id);

      res.setHeader("x-access-token", reAuthorizationToken);
      req.user = verifyToken(reAuthorizationToken).data;
    }

    next();
  } catch (err) {
    console.error(err);
    let apiResponse = null;
    // Create response.
    apiResponse = console.response(err.cause, err.message);
    // Send response.
    res.status(apiResponse.status).json(apiResponse);
  }
}

module.exports = { authenticate };
