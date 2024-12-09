const Task = require("../models/Todo");

exports.saveTask = async (req, res, next) => {
  const { title, description, dueDate, status } = req.body;

  try {
    const todo = new Task({
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
};

exports.getTask = async (req, res, next) => {
  try {
    const allUserTasks = await Task.find({ user: req.user.userid });
    sendSuccessResponse(res, 200, allUserTasks, "All tasks.");
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete({
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
};
