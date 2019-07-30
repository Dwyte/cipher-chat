const { Chat, validate } = require("./models/chat");
const { OnlineUser } = require("./models/onlineUser");

const socket = socket => {
  socket.on("new-user", async user => {
    let newUser = await OnlineUser.findOneAndUpdate(
      { user: user._id },
      { $set: { socketId: socket.id } },
      { new: true }
    );
    if (newUser) return;

    newUser = new OnlineUser({ socketId: socket.id, user: user._id });
    newUser = await newUser.save();

    const onlineUsers = await OnlineUser.find().populate("user");

    socket.broadcast.emit("user-connected", onlineUsers);
  });

  socket.on("disconnect", async () => {
    await OnlineUser.findOneAndDelete({ socketId: socket.id });

    const onlineUsers = await OnlineUser.find().populate("user");

    socket.broadcast.emit("user-connected", onlineUsers);
  });

  socket.on("user-offline", async () => {
    await OnlineUser.findOneAndDelete({ socketId: socket.id });

    const onlineUsers = await OnlineUser.find().populate("user");

    socket.broadcast.emit("user-connected", onlineUsers);
  });

  socket.on("get-chats", async (channel, limit) => {
    const chatsToDelete = await Chat.find({ channel }).sort({ _id: 1 });

    let chats = chatsToDelete.splice(-limit);

    for (let chat of chatsToDelete) {
      await Chat.findByIdAndDelete(chat._id);
    }

    socket.emit("return-chats", chats);
  });

  socket.on("send-message", async chatData => {
    const { error } = validate(chatData);
    if (error) return socket.emit("message-invalid", error.details[0].message);

    let chat = new Chat(chatData);
    chat = await chat.save();

    socket.emit("new-message", chat);
    socket.broadcast.emit("new-message", chat);
  });
};

module.exports = socket;
