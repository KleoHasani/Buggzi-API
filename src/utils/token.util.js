const { sign, verify, decode } = require("jsonwebtoken");

const ACCESS = "30m";
const REFRESH = "1y";

/**
 * Genearte access token with user and sessionID.
 * @param {string} payload.user
 * @param {string} payload.sessionID
 * @returns {string}
 */
function createAccessToken(userID, sessionID) {
  return `Bearer ${sign({ userID, sessionID }, process.env.TOKEN_SIGN_KEY, { expiresIn: ACCESS })}`;
}

/**
 * Genearte refresh token with and sessionID.
 * @param {string} sessionID
 * @returns {string}
 */
function createRefreshToken(sessionID) {
  return sign({ sessionID }, process.env.TOKEN_SIGN_KEY, { expiresIn: REFRESH });
}

/**
 * Verify token.
 * @param {string} token
 * @returns {boolean, boolean, JWTPayload | null}
 */
function verifyToken(token) {
  try {
    const data = verify(token, process.env.TOKEN_SIGN_KEY);
    return {
      valid: true,
      expired: false,
      data,
    };
  } catch (err) {
    console.log(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      data: null,
    };
  }
}

/**
 * Deserialize a token without checking its validity.
 * @param {string} token
 * @returns {JWTPayload}
 */
function deserializeToken(token) {
  return decode(token);
}

module.exports = { createAccessToken, createRefreshToken, verifyToken, deserializeToken };
