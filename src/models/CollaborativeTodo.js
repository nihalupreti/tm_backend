const mongoose = require("mongoose");
const { todoScheme } = require("./Todo");

const collaborativeTasksSchema = todoScheme.clone();

collaborativeTasksSchema.add({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    require: true,
  },
});

const GroupTask = mongoose.model("GroupTask", collaborativeTasksSchema);

module.exports = GroupTask;
