import React, { useState, useEffect } from "react";
import "./chatbox.css";
import ChatBubble from "./chatbubble";
import ChatForm from "./chatForm";
import cryptico from "cryptico";
import { SHA256 } from "crypto-js";
import openSocket from "socket.io-client";
const socket = openSocket(
  process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:4200"
);

const ChatBox = ({ user, match, userKeys }) => {
  const [chats, setChats] = useState([]);

  const channel = match.params.channel;
  const isSecret = channel !== "global";
  const limit = isSecret ? 10 : 100;
  const pbkHash = isSecret ? SHA256(userKeys.pbk).toString() : undefined;

  useEffect(() => {
    setChats([]);

    socket.connect();

    socket.emit("get-chats", channel, limit, pbkHash);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [channel, userKeys]);

  socket.on("return-chats", returnChats => {
    updateChats(returnChats);
  });

  socket.on("new-message", chat => {
    if (isSecret) return;

    if (chat.channel !== channel) return;

    const chatsToDelete = [...chats, chat];
    const chatLimit = chatsToDelete.splice(-limit);
    updateChats(chatLimit);
  });

  socket.on("new-secret-message", chat => {
    if (!isSecret) return;

    if (chat.channel !== channel) return;

    const chatsToDelete = [...chats, chat];
    const chatLimit = chatsToDelete.splice(-limit);

    updateChats(chatLimit);
  });

  socket.on("message-invalid", error => {
    alert(error);
  });

  const decryptMsg = msg => {
    const _chats = [...chats];
    const _msg = _chats.find(m => m === msg);

    _msg.name = cryptico.decrypt(msg.name, userKeys.pvk).plaintext;
    _msg.timestamp = cryptico.decrypt(msg.timestamp, userKeys.pvk).plaintext;
    _msg.message = cryptico.decrypt(msg.message, userKeys.pvk).plaintext;
    _msg.decrypted = true;

    setChats(_chats);
  };

  const updateChats = newChats => {
    setChats(newChats);

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

    if (userKeys.pbk === chatMatePbk) return;

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
    let prevMsg = null;

    return chats.length === 0 ? (
      <div className="chat-notif">No messages yet. Say hello!</div>
    ) : (
      chats.map(m => {
        const chatBubble = (
          <ChatBubble
            key={chats.indexOf(m)}
            username={user.username}
            userKeys={userKeys}
            isSecret={isSecret}
            msgObj={m}
            prevMsg={prevMsg}
            decryptMsg={decryptMsg}
          />
        );

        prevMsg = m;

        return chatBubble;
      })
    );
  };

  return (
    <div className="grid-container chatbox-container">
      <div id="chatbox">{populateChatBox()}</div>

      <ChatForm sendMessage={sendMessage} isSecret={isSecret} />
    </div>
  );
};

export default ChatBox;
