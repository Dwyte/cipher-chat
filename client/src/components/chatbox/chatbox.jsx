import React, { useState, useEffect } from "react";
import "./chatbox.css";
import ChatBubble from "./chatbubble";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000");

const ChatBox = ({ user }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.emit("get-chats");
  }, []);

  socket.on("return-chats", chats => {
    setChats(chats);
    updateScroll();
  });

  socket.on("new-message", chat => {
    setChats([...chats, chat]);
    updateScroll();
  });

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const sendMessage = e => {
    e.preventDefault();

    const chatMessage = {
      name: user.username,
      message
    };

    socket.emit("send-message", chatMessage);

    setMessage("");
  };

  const updateScroll = () => {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  return (
    <div className="grid-container chatbox-container">
      <div id="chatbox">
        {chats.map(m => (
          <ChatBubble key={chats.indexOf(m)} username={user.username} {...m} />
        ))}
      </div>

      <div className="message-form">
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            type="text"
          />
        </form>
      </div>

      <div className="message-submit">
        <button>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
