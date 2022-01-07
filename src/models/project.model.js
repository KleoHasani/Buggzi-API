const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    name: { type: String, required: true },
    description: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const ProjectModel = model("Project", ProjectSchema, "tblProjects");

module.exports = { ProjectModel };
