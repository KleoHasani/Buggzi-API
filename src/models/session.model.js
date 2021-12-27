const { Schema, model } = require("mongoose");

const SessionSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    valid: { type: Boolean, default: true, required: true },
    agent: { type: String, required: true },
  },
  { timestamps: true }
);

const SessionModel = model("Session", SessionSchema, "tblSessions");

module.exports = { SessionModel };
