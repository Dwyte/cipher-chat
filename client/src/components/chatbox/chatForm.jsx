import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Input from "../input";
import styled from "styled-components";

const SendButton = styled.i`
  margin-left: -25px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

const MessageInput = styled(Input)`
  padding-right: 32px !important;
`;

const ChatForm = ({ submitMessage, isSecret }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  function handleMessageChange({ target }) {
    setMessage(target.value);
  }

  function handleSendEvent(e) {
    e.preventDefault();
    if (message.trim() === "") return;

    setDisabled(true);
    submitMessage(message);

    setTimeout(() => {
      setDisabled(false);
      setMessage("");
    }, 7500);
  }

  const inputPlaceholder = isSecret
    ? "Private Channel - Encrypted - 10msgs max"
    : "Global Channel - Plain Text - 100msgs max";

  return (
    <form disabled onSubmit={handleSendEvent}>
      <ReactTooltip place="top" effect="solid" />

      <MessageInput
        value={disabled ? "Cooldown for a moment, don't spam..." : message}
        onChange={handleMessageChange}
        minLength="1"
        maxLength="500"
        data-tip={inputPlaceholder}
        placeholder="Start Chatting..."
        type="Text"
        autoFocus
        required
        disabled={disabled}
      />

      <SendButton onClick={handleSendEvent} className="fab fa-telegram-plane" />
    </form>
  );
};

export default ChatForm;
