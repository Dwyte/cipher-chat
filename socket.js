const { Chat, validate } = require("./models/chat");
const { OnlineUser } = require("./models/onlineUser");

const socket = socket => {
  socket.on("user-login", async user => {
    let newUser = await OnlineUser.findOne({ user: user._id });
    if (newUser) return;

    newUser = new OnlineUser({ user: user._id });
    newUser = await newUser.save();

    const onlineUsers = await OnlineUser.find().populate("user");

    socket.broadcast.emit("new-user", onlineUsers);
  });

  socket.on("user-logout", async userId => {
    await OnlineUser.findOneAndDelete({ user: userId });

    const onlineUsers = await OnlineUser.find().populate("user");

    socket.broadcast.emit("new-user", onlineUsers);
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
