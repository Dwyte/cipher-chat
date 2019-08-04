const { User } = require("./models/user");

const socket = socket => {
  socket.on("new-user", async user => {
    console.log("new-user: ", user.username);

    socket.broadcast.emit("user-connected", user);
  });

  socket.on("disconnect", async () => {
    const user = await User.findOneAndUpdate(
      { status: socket.id },
      { status: "" },
      { useFindAndModify: false }
    );

    console.log("user-disconnect: ", user.username);
    socket.broadcast.emit("user-disconnected", user);
  });

  socket.on("user-offline", async () => {
    const user = await User.findOneAndUpdate(
      { status: socket.id },
      { status: "" },
      { useFindAndModify: false }
    );

    console.log("user-disconnect: ", user.username);
    socket.broadcast.emit("user-disconnected", user);
  });

  socket.on("broadcast-message", async msgObj => {
    // console.log("broadcast-message: ", msgObj);
    socket.broadcast.emit("new-message", msgObj);
  });
};

module.exports = socket;
