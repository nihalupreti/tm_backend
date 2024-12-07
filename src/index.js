const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const checkOverdueTasks = require("./utils/overduechecker");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const errorHandler = require("./middlewares/errors");

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); //bypass SOP
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listining on port number 3000.");
});
