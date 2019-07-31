import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Input from "../input";

const ChatForm = ({ sendMessage, isSecret }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSendEvent = e => {
    e.preventDefault();

    if (message.trim() === "") return;

    sendMessage(message);

    setMessage("");
  };

  const inputPlaceholder = isSecret
    ? "Private Channel - Encrypted - 10msgs max"
    : "Global Channel - Plain Text - 100msgs max";

  return (
    <form onSubmit={handleSendEvent}>
      <ReactTooltip place="top" effect="solid" />

      <Input
        value={message}
        onChange={handleMessageChange}
        minLength="1"
        maxLength="500"
        data-tip={inputPlaceholder}
        placeholder="Type Something..."
        type="Text"
        autoFocus
        required
      />
    </form>
  );
};

export default ChatForm;
