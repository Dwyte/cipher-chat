const { Chat, validate } = require("./models/chat");

const socket = socket => {
  socket.on("new-user", user => {
    console.log("New User: ", user);
  });

  socket.on("get-chats", async (channel, limit, pbkHash) => {
    const chatsToDelete = await Chat.find({ channel }).sort({ _id: 1 });

    if (pbkHash) limit *= 2;

    let chats = chatsToDelete.splice(-limit);

    for (let chat of chatsToDelete) {
      await Chat.findByIdAndDelete(chat._id);
    }

    if (pbkHash) chats = chats.filter(msg => msg.pbkHash === pbkHash);

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

  socket.on("send-secret-msg-self", async chatData => {
    let chat = new Chat(chatData);
    chat = await chat.save();

    socket.emit("new-secret-message", chat);
  });

  socket.on("send-secret-msg", async chatData => {
    let chat = new Chat(chatData);
    chat = await chat.save();

    socket.broadcast.emit("new-secret-message", chat);
  });

  console.log("socket");
};

module.exports = socket;
