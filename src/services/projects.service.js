const { ProjectModel } = require("../models/project.model");

/**
 * Create a new project.
 * @param {string} userID
 * @param {string} name
 * @param {string} description
 * @returns {object}
 */
async function createProjectService(userID, name, description) {
  try {
    return await ProjectModel.create({
      userID,
      name,
      description,
    });
  } catch {
    throw new Error("Unable to create a new project.");
  }
}

/**
 * Delete project by projectID.
 * @param {string} projectID
 */
async function deleteProjectService(projectID) {
  try {
    await ProjectModel.findByIdAndDelete(projectID);
  } catch {
    throw new Error("Unable to delete project.");
  }
}

module.exports = { createProjectService, deleteProjectService };
