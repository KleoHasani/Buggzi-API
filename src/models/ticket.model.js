const { Schema, model } = require("mongoose");

const TicketStatus = {
  ticket: 0,
  progress: 1,
  completed: 2,
};

const TicketSchema = new Schema(
  {
    projectID: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignID: { type: [Schema.Types.ObjectId], ref: "User", required: false, default: [] },
    name: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    status: { type: TicketStatus, required: true, default: TicketStatus.ticket },
  },
  { timestamps: true }
);

TicketSchema.virtual("isAssigned").get(function getIsAssigned() {
  return this.assignID.length > 0;
});

const TicketModel = model("Ticket", TicketSchema, "tblTickets");

module.exports = { TicketModel };
