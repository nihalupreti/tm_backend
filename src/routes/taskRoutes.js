const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  saveTask,
  getTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.use(authMiddleware);

router.post("/todo", saveTask);
router.get("/todos", getTask);
router.delete("/todo/:id", deleteTask);

// router.put("/todo/:id", authMiddleware, (req, res) => {
//   const { title, description, dueDate, status } = req.body; //updated data
//   const { id } = req.params;
//   task
//     .findByIdAndUpdate(
//       id, //id of tasks to be updated
//       { title, description, dueDate, status }, // New data to update
//       { new: true } // Returns the updated task
//     )
//     .then((updatedTask) => {
//       if (!updatedTask) {
//         return res.status(404).json({ message: "Task not found" });
//       }
//       res
//         .status(200)
//         .json({ message: "Task updated successfully", task: updatedTask });
//     })
//     .catch((err) => {
//       console.log("Error updating task:", err);
//       res.status(500).json({ message: "Server error" });
//     });
// });

// router.get("/todo/completed", authMiddleware, (req, res) => {
//   task
//     .find({ user: req.user.userid, status: true })
//     .then((task) => {
//       res.status(200).json(task);
//     })
//     .catch((err) => {
//       console.log("couldnot fetch completed tasks from database.");
//       res.status(400).json({ message: "try again" });
//     });
// });
module.exports = router;
