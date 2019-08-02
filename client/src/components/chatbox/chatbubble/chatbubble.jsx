import React, { useState } from "react";
import CryptoJS from "crypto-js";
import styled from "styled-components";
import ChatTimestamp from "./chatTimestamp";
import ChatMsg from "./chatMsg";
import { getUser } from "../../../services/userService";

const { AES } = CryptoJS;

const ParentContainer = styled.div`
  ${props =>
    props.sentByUser &&
    `
    float: right;
    width: 100%;
  `}
  margin-bottom: 3px;
`;

const Container = styled.div`
  max-height: 20px;
  padding: 0px 0px;
  display: table;
  ${props =>
    props.sentByUser &&
    `
    float: right;
    text-align: right;
  `}
`;

const SenderName = styled.div`
  font-weight: bold;
  font-size: 12px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ChatBubble = ({
  currUser,
  msgObj,
  isSecret,
  passphrase,
  prevMsg,
  decryptMsg,
  handleChannelOpen
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);

  let { name, message, timestamp, decrypted } = msgObj;

  if (isSecret)
    if (!decrypted) {
      name = AES.decrypt(name, passphrase).toString(CryptoJS.enc.Utf8);
      if (name === currUser.username) decryptMsg(msgObj);
    }

  const displayName = name === currUser.username ? "You" : name;

  function prevSentByUser() {
    if (!prevMsg) return false;

    const { name: prevName, decrypted: prevDecrypted } = prevMsg;
    const prevNamePlain = isSecret
      ? prevDecrypted
        ? prevName
        : AES.decrypt(prevName, passphrase).toString(CryptoJS.enc.Utf8)
      : prevName;
    return prevNamePlain === name;
  }

  function decryptMessage() {
    if (!isSecret) return;

    decryptMsg(msgObj);
  }

  function handleMsgBubbleClick() {
    if (isSecret) {
      if (decrypted) setShowTimestamp(!showTimestamp);
      else decryptMessage();
    } else setShowTimestamp(!showTimestamp);
  }

  async function handleSenderClick() {
    const { data: user } = await getUser({ username: name }, {});

    handleChannelOpen(currUser, user);
  }

  return (
    <ParentContainer sentByUser={name === currUser.username}>
      <Container sentByUser={name === currUser.username}>
        <SenderName onClick={handleSenderClick}>
          {prevSentByUser() || displayName}
        </SenderName>
        <ChatMsg
          onClick={handleMsgBubbleClick}
          onMouseLeave={() => setTimeout(() => setShowTimestamp(false), 1250)}
          isSecret={isSecret}
          decrypted={decrypted}
          message={message}
        />
        {showTimestamp && (
          <ChatTimestamp
          sentByUser={name === currUser.username}
            isSecret={isSecret}
            decrypted={decrypted}
            timestamp={timestamp}
            seen={msgObj.seen}
          />
        )}
      </Container>
    </ParentContainer>
  );
};

export default ChatBubble;
