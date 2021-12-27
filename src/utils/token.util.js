const { sign, verify } = require("jsonwebtoken");

const ACCESS = "30m";
const REFRESH = "1y";

/**
 * Genearte toke with userID and sessionID.
 * @param {string} payload.userID
 * @param {string} payload.sessionID
 * @param {string} ttl
 * @returns {string}
 */
function createToken({ userID, sessionID }, ttl = ACCESS) {
  return sign({ userID, sessionID }, process.env.TOKEN_SIGN_KEY, { expiresIn: ttl });
}

/**
 * Verify token.
 * @param {string} token
 * @returns {JWTPayload}
 */
function verifyToken(token) {
  return verify(token, process.env.TOKEN_SIGN_KEY);
}

module.exports = { ACCESS, REFRESH, createToken, verifyToken };
