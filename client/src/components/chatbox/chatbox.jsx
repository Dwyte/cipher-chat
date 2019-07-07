import React, { useState, useEffect } from "react";
import "./chatbox.css";
import ChatBubble from "./chatbubble";

import openSocket from "socket.io-client";
const socket = openSocket();

const ChatBox = ({ user, match }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const channel = match.params.channel;

  useEffect(() => {
    socket.connect();

    socket.emit("get-chats", channel);

    return () => socket.disconnect();    
  }, []);

  socket.on("return-chats", chats => {
    updateChats(chats);
  });

  socket.on("new-message", chat => {
    updateChats([...chats, chat]);
  });

  const updateChats = chats => {
    setChats(chats);
    updateScroll();
  };

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const sendMessage = e => {
    e.preventDefault();

    const chatMessage = {
      name: user.username,
      channel,
      message
    };

    socket.emit("send-message", chatMessage);

    setMessage("");
  };

  const updateScroll = () => {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = chatbox.scrollHeight;
  };

  const populateChatBox = () => {
    return chats.length === 0 ? (
      <div className="chat-notif">No messages yet. Say hello!</div>
    ) : (
      chats.map(m => (
        <ChatBubble key={chats.indexOf(m)} username={user.username} {...m} />
      ))
    );
  };

  return (
    <div className="grid-container chatbox-container">
      <div id="chatbox">{populateChatBox()}</div>

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
        <button onClick={sendMessage}>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
