import React, { useState, useEffect } from "react";
import ChatBubble from "./chatbubble/chatbubble";
import ChatForm from "./chatForm";
import CryptoJS from "crypto-js";
import styled from "styled-components";
import Container from "../container";
import { getChats, sendChat } from "../../services/chatService";
import Axios from "axios";
const { AES } = CryptoJS;

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

  const source = Axios.CancelToken.source();
  useEffect(() => {
    setChats([]);

    const getChannelChats = async () => {
      try {
        const { data: channelChats } = await getChats(channel, limit, {
          cancelToken: source.token
        });

        updateChats(channelChats);

      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    };

    getChannelChats();


    return () => {
      console.log("Cleaning...");
      source.cancel();
      socket.off("new-message");
    };

    // eslint-disable-next-line
  }, [channel]);

  socket.on("new-message", chat => {
    if (chat.channel !== channel) return;

    const chatsToDelete = [...chats, chat];
    const chatLimit = chatsToDelete.splice(-limit);
    updateChats(chatLimit);
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

  function updateChats(newChats) {
    if (socket.connected) setChats(newChats);

    updateScroll();
  }

  async function submitMessage(message) {
    const name = user.username;
    const timestamp = new Date().toString();

    const userMsg = isSecret
      ? encryptMsg(
          {
            name,
            message,
            timestamp
          },
          passphrase
        )
      : {
          name,
          channel,
          message,
          timestamp
        };

    const { data: chatMsg } = await sendChat(userMsg, {
      cancelToken: source.token
    });

    updateChats([...chats, userMsg]);
    socket.emit("broadcast-message", chatMsg);
  }

  function encryptMsg(msgObj, passphrase) {
    for (let k in msgObj) {
      msgObj[k] = AES.encrypt(msgObj[k], passphrase).toString();
    }

    msgObj["channel"] = channel;

    return msgObj;
  }

  function updateScroll() {
    const chatbox = document.getElementById("chatbox");
    if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;
  }

  function populateChatBox() {
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
  }

  return (
    <React.Fragment>
      <Container id="chatbox">{populateChatBox()}</Container>

      <ChatForm submitMessage={submitMessage} isSecret={isSecret} />
    </React.Fragment>
  );
};

export default ChatBox;
