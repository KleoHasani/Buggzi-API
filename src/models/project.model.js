const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    team: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    tickets: { type: [Schema.Types.ObjectId], ref: "Tickets", default: [] },
  },
  { timestamps: true }
);

ProjectSchema.virtual("hasTeamMembers").get(function getHasTeamMembers() {
  return this.team.length > 0;
});

ProjectSchema.virtual("hasTickets").get(function getHasTickets() {
  return this.tickets.length > 0;
});

const ProjectModel = model("Project", ProjectSchema, "tblProjects");

module.exports = { ProjectModel };
