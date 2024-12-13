module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("client connected succesfully");

    //events
    socket.on("group invitation", (msg) => {
      console.log("invitation received");
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
