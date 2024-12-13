const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  groups: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
