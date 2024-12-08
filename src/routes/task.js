const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { todos: task } = require("../config/database");
const sendSuccessResponse = require("../utils/reponse");
const ApiError = require("../utils/customError");

const router = express.Router();

router.post("/todo", authMiddleware, async (req, res, next) => {
  const { title, description, dueDate, status } = req.body;

  try {
    const todo = new task({
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      user: req.user.userid,
    });
    const saveTodo = await todo.save();
    sendSuccessResponse(res, 200, saveTodo, "Sucessfully created the task.");
  } catch (err) {
    next(err);
  }
});

router.get("/todos", authMiddleware, async (req, res, next) => {
  try {
    const allUserTasks = await task.find({ user: req.user.userid });
    sendSuccessResponse(res, 200, allUserTasks, "All tasks.");
  } catch (err) {
    next(err);
  }
});

router.delete("/todo/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTask = await task.findByIdAndDelete({
      _id: id,
      user: req.user.userid,
    });

    if (!deletedTask) {
      throw new ApiError(404, "Task not found.", `No task with id ${id}`);
    }

    sendSuccessResponse(res, 200, deletedTask, "Task deleted successfully.");
  } catch (err) {
    next(err);
  }
});

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
