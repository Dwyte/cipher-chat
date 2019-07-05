const { Chat, validate } = require("./models/chat");

const socket = socket => {
  socket.on("new-user", user => {
    console.log("New User: ", user);
  });

  socket.on("get-chats", async channel => {
    const globalChats = await Chat.find({ channel })
      .limit(100)
      .sort({ _id: 1 });
    socket.emit("return-chats", globalChats);
  });

  socket.on("send-message", async chatData => {
    let chat = new Chat(chatData);
    chat = await chat.save();

    socket.emit("new-message", chat);
    socket.broadcast.emit("new-message", chat);
  });
};

module.exports = socket;
