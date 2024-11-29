const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Listining on port number 3000.");
});
