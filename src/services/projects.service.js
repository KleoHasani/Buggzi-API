const { set } = require("mongoose");
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
    await ProjectModel.create({
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
 * @param {string} userID
 */
async function deleteProjectService(projectID, userID) {
  try {
    await ProjectModel.findOneAndDelete({ _id: projectID, userID: userID });
  } catch {
    throw new Error("Unable to delete project.");
  }
}

/**
 * Update project by projectID.
 * @param {object} q
 * @param {object} d
 * @param {string} q.projectID
 * @param {string} q.userID
 * @param {string} d.name
 * @param {string} d.description
 */
async function updateProjectService(q, d) {
  try {
    await ProjectModel.findOneAndUpdate(
      { _id: q.projectID, userID: d.userID },
      { $set: { name: d.name, description: d.description } }
    );
  } catch {
    throw new Error("Unable to update project.");
  }
}

module.exports = { createProjectService, deleteProjectService, updateProjectService };
