const mongoose = require("mongoose");

const todoScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["ongoing", "completed", "scheduled"],
      default: "scheduled",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'User' model
      required: true, // Ensure a user is associated with the todo
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todos", todoScheme);

module.exports = Todo;
