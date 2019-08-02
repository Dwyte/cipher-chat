const { User } = require("./models/user");

const socket = socket => {
  socket.on("new-user", async () => {
    socket.broadcast.emit("user-connected");
  });

  socket.on("disconnect", async () => {
    await User.findOneAndUpdate({ status: socket.id }, { status: "" });

    socket.broadcast.emit("user-connected");
  });

  socket.on("user-offline", async () => {
    await User.findOneAndUpdate({ status: socket.id }, { status: "" });
    socket.broadcast.emit("user-connected");
  });

  socket.on("broadcast-message", async msgObj => {
    // console.log("broadcast-message: ", msgObj);
    socket.broadcast.emit("new-message", msgObj);
  });
};

module.exports = socket;
