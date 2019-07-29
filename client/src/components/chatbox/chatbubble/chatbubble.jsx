import React, { useState } from "react";
import CryptoJS from "crypto-js";
import styled from "styled-components";
import ChatTimestamp from "./chatTimestamp";
import ChatMsg from "./chatMsg";

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
`;

const ChatBubble = ({
  username,
  msgObj,
  isSecret,
  passphrase,
  prevMsg,
  decryptMsg
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);

  let { name, message, timestamp, decrypted } = msgObj;

  if (isSecret)
    if (!decrypted) {
      name = AES.decrypt(name, passphrase).toString(CryptoJS.enc.Utf8);
      if (name === username) decryptMsg(msgObj);
    }

  const displayName = name === username ? "You" : name;

  function prevSentByUser() {
    if (!prevMsg) return false;

    const { name: prevName, decrypted: prevDecrypted } = prevMsg;
    const prevNamePlain = isSecret
      ? prevDecrypted
        ? prevName
        : AES.decrypt(name, passphrase).toString(CryptoJS.enc.Utf8)
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

  return (
    <ParentContainer sentByUser={name === username}>
      <Container sentByUser={name === username}>
        <SenderName>{prevSentByUser() || displayName}</SenderName>
        <ChatMsg
          onClick={handleMsgBubbleClick}
          onMouseLeave={() => setTimeout(() => setShowTimestamp(false), 1250)}
          isSecret={isSecret}
          decrypted={decrypted}
          message={message}
        />
        {showTimestamp && (
          <ChatTimestamp
            isSecret={isSecret}
            decrypted={decrypted}
            timestamp={timestamp}
          />
        )}
      </Container>
    </ParentContainer>
  );
};

export default ChatBubble;
