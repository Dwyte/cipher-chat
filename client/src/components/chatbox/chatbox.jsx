import React, { useState, useEffect } from "react";
import ChatBubble from "./chatbubble/chatbubble";
import ChatForm from "./chatForm";
import CryptoJS from "crypto-js";
import styled from "styled-components";
const { AES } = CryptoJS;

const Container = styled.div`
  height: 415px;
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
`;

const ChatBoxDiv = styled.div`
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  grid-row-end: 11;
  background: white;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

  scrollbar-color: #2e2e2e #aeaeae;
  scrollbar-width: thin;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px #2e2e2e;
  }
`;

const ChatNotif = styled.div`
  text-align: center;
  padding: 3px;
  font-size: 10px;
  color: white;
  background: #4e4e4e;
  width: 125px;
  margin: 24px auto;
`;

const ChatBox = ({ socket, user, match, getPassphrase }) => {
  const [chats, setChats] = useState([]);

  const channel = match.params.channel;
  const isSecret = channel !== "global";
  const limit = isSecret ? 10 : 100;
  const passphrase = isSecret && getPassphrase();

  useEffect(() => {
    setChats([]);

    if (socket.connected) socket.emit("get-chats", channel, limit);

    // eslint-disable-next-line
  }, [channel]);

  socket.on("return-chats", returnChats => {
    updateChats(returnChats);
  });

  socket.on("new-message", chat => {
    if (chat.channel !== channel) return;

    const chatsToDelete = [...chats, chat];
    const chatLimit = chatsToDelete.splice(-limit);
    updateChats(chatLimit);
  });

  socket.on("message-invalid", error => {
    alert(error);
  });

  function decryptMsg(msg) {
    const _chats = [...chats];
    const _msg = _chats.find(m => m === msg);

    _msg.name = AES.decrypt(_msg.name, passphrase).toString(CryptoJS.enc.Utf8);
    _msg.timestamp = AES.decrypt(_msg.timestamp, passphrase).toString(
      CryptoJS.enc.Utf8
    );
    _msg.message = AES.decrypt(_msg.message, passphrase).toString(
      CryptoJS.enc.Utf8
    );
    _msg.decrypted = true;

    setChats(_chats);
  }

  const updateChats = newChats => {
    if (socket.connected) setChats(newChats);

    updateScroll();
  };

  const sendMessage = message => {
    if (isSecret) sendSecret(message);
    else sendPlain(message);
  };

  const sendSecret = message => {
    const name = user.username;
    const timestamp = new Date().toString();

    const userMsg = encryptMsg(
      {
        name,
        message,
        timestamp
      },
      passphrase
    );

    socket.emit("send-message", userMsg);
  };

  const encryptMsg = (msgObj, passphrase) => {
    for (let k in msgObj) {
      msgObj[k] = AES.encrypt(msgObj[k], passphrase).toString();
    }

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
    if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;
  };

  const populateChatBox = () => {
    let prevMsg = null;

    return chats.length === 0 ? (
      <ChatNotif>No messages yet. Say hello!</ChatNotif>
    ) : (
      chats.map(msgObj => {
        const chatBubble = (
          <ChatBubble
            key={chats.indexOf(msgObj)}
            username={user.username}
            passphrase={passphrase}
            isSecret={isSecret}
            msgObj={msgObj}
            prevMsg={prevMsg}
            decryptMsg={decryptMsg}
          />
        );

        prevMsg = msgObj;

        return chatBubble;
      })
    );
  };

  return (
    <Container>
      <ChatBoxDiv id="chatbox">{populateChatBox()}</ChatBoxDiv>

      <ChatForm sendMessage={sendMessage} isSecret={isSecret} />
    </Container>
  );
};

export default ChatBox;
