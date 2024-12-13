const mongoose = require("mongoose");

const invitationSchema = mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["accepted", "rejected", "pending"] },
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;
