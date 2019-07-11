import React, { useState, useEffect } from "react";
import "./chatbox.css";
import ChatBubble from "./chatbubble";
import cryptico from "cryptico";
import { SHA256 } from "crypto-js";
import openSocket from "socket.io-client";
import ChatForm from "./chatForm";
const socket = openSocket();

const ChatBox = ({ user, userKeys, chatMatePbk, match }) => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const channel = match.params.channel;
  const isSecret = channel !== "global";
  const filter = { channel };
  if (isSecret) {
    filter.pbkHash = SHA256(userKeys.pbk).toString();
    console.log(filter);
  }

  useEffect(() => {
    socket.connect();

    socket.emit("get-chats", filter);

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

    if (isSecret) sendSecret();
    else sendPlain();

    setMessage("");
  };

  const sendSecret = () => {
    const userMsg = {
      name: user.username,
      channel,
      message: cryptico.encrypt(message, userKeys.pbk).cipher,
      timestamp: new Date(),
      pbkHash: SHA256(userKeys.pbk).toString()
    };

    socket.emit("send-secret-msg-self", userMsg);

    const chatMateMsg = {
      name: user.username,
      channel,
      message: cryptico.encrypt(message, chatMatePbk).cipher,
      timestamp: new Date(),
      pbkHash: SHA256(chatMatePbk).toString()
    };

    socket.emit("send-secret-msg", chatMateMsg);
  };

  const sendPlain = () => {
    const userMsg = {
      name: user.username,
      channel,
      message,
      timestamp: new Date()
    };

    socket.emit("send-message", userMsg);
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
        <ChatBubble
          key={chats.indexOf(m)}
          username={user.username}
          userKeys={userKeys}
          isSecret={isSecret}
          {...m}
        />
      ))
    );
  };

  return (
    <div className="grid-container chatbox-container">
      <div id="chatbox">{populateChatBox()}</div>

      <ChatForm
        message={message}
        sendMessage={sendMessage}
        handleMessageChange={handleMessageChange}
      />
    </div>
  );
};

export default ChatBox;
