import React, { useState, useEffect } from "react";
import ChatBubble from "./chatbubble/chatbubble";
import ChatForm from "./chatForm";
import cryptico from "cryptico";
import { SHA256 } from "crypto-js";
import styled from "styled-components";

const Container = styled.div`
  height: 400px;
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

  scrollbar-color: #2e2e2e #aeaeae;
  scrollbar-width: thin;
`;

const ChatNotif = styled.div`
  text-align: center;
  padding: 3px;
  font-size: 10px;
  color: white;
  background: #4e4e4e;
  width: 125px;
  margin: auto;
`;

const ChatBox = ({ socket, user, match, userKeys }) => {
  const [chats, setChats] = useState([]);

  const channel = match.params.channel;
  const isSecret = channel !== "global";
  const limit = isSecret ? 10 : 100;
  const pbkHash = isSecret ? SHA256(userKeys.pbk).toString() : undefined;

  useEffect(() => {
    setChats([]);

    if (socket.connected) socket.emit("get-chats", channel, limit, pbkHash);

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
      <ChatNotif>No messages yet. Say hello!</ChatNotif>
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
    <Container>
      <ChatBoxDiv id="chatbox">{populateChatBox()}</ChatBoxDiv>

      <ChatForm sendMessage={sendMessage} isSecret={isSecret} />
    </Container>
  );
};

export default ChatBox;
