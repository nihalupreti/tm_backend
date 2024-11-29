const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(3000, () => {
  console.log("Listining on port number 3000.");
});
