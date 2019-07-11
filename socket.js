const { Chat, validate } = require("./models/chat");

const socket = socket => {
  socket.on("new-user", user => {
    console.log("New User: ", user);
  });

  socket.on("get-chats", async filter => {
    const globalChats = await Chat.find(filter)
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

  socket.on("send-secret-msg-self", async chatData => {
    let chat = new Chat(chatData);
    chat = await chat.save();

    socket.emit("new-message", chat);
  });

  socket.on("send-secret-msg", async chatData => {
    let chat = new Chat(chatData);
    chat = await chat.save();

    socket.broadcast.emit("new-message", chat);
  });

  console.log("socket");
};

module.exports = socket;
