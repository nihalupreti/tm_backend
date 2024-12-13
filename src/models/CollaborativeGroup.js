const mongoose = require("mongoose");

const collaborativeGroupSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Group = mongoose.model("Group", collaborativeGroupSchema);

module.exports = Group;
