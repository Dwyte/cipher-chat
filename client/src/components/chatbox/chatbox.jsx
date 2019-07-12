import React, { useState, useEffect } from "react";
import "./chatbox.css";
import ChatBubble from "./chatbubble";
import cryptico from "cryptico";
import { SHA256 } from "crypto-js";
import openSocket from "socket.io-client";
import ChatForm from "./chatForm";
const socket = openSocket();

const ChatBox = ({ user, match, userKeys }) => {
  const [chats, setChats] = useState([]);

  const channel = match.params.channel;
  const isSecret = channel !== "global";
  const filter = isSecret
  ? { channel, pbkHash: SHA256(userKeys.pbk).toString() }
  : { channel };

  useEffect(() => {
    setChats([]);

    socket.connect();

    socket.emit("get-chats", filter);

    return () => {
      socket.disconnect();
    };
  }, [channel]);

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

  const sendMessage = message => {
    if (isSecret) sendSecret(message);
    else sendPlain(message);
  };

  const sendSecret = message => {
    const name = user.username;
    const timestamp = new Date().toString();

    const chatMatePbk = localStorage.getItem("chatmate_pbk");

    const userMsg = encryptMsg(
      {
        name,
        message,
        timestamp
      },
      userKeys.pbk
    );

    socket.emit("send-secret-msg-self", userMsg);

    const chatMateMsg = encryptMsg(
      {
        name,
        message,
        timestamp
      },
      chatMatePbk
    );

    socket.emit("send-secret-msg", chatMateMsg);
  };

  const encryptMsg = (msgObj, pbk) => {
    for (let k in msgObj) {
      msgObj[k] = cryptico.encrypt(msgObj[k], pbk).cipher;
    }

    msgObj["pbkHash"] = SHA256(pbk).toString();
    msgObj["channel"] = channel;

    return msgObj;
  };

  const sendPlain = message => {
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

      <ChatForm sendMessage={sendMessage} />
    </div>
  );
};

export default ChatBox;
