const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errors");
const connectDB = require("./config/database");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/team", groupRoutes);

require("./sockets")(io); //require automatically finds index file and passes io as arg

app.use(errorHandler);

server.listen(3000, () => {
  console.log("Listining at port 3000");
});
