const { UserModel } = require("../models/user.model");

/**
 * Create a new user in the database.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<void>}
 */
async function createUserService(username, password) {
  try {
    await UserModel.create({ username, password });
  } catch (err) {
    if (err.cause === 400) throw err;
    throw new Error("Username is taken.");
  }
}

/**
 * Validate and return user.
 * @param {string} username
 * @param {password} password
 * @returns {object}
 */
async function validateUserService(username, password) {
  // Validate user.
  const user = await UserModel.findOne({ username });

  if (!user) throw new Error("Unable to authenticate user");

  const isValid = await user.validatePassword(password);

  if (!isValid) throw new Error("Unable to authenticate password");

  return user;
}

/**
 * Delete sessions and user.
 * @param {string} userID
 */
async function deleteUserService(userID) {
  try {
    // Delete user
    await UserModel.findByIdAndDelete(userID);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { createUserService, validateUserService, deleteUserService };
