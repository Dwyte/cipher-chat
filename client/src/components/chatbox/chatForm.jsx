import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Input from "../input";

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

      <Input
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
    </form>
  );
};

export default ChatForm;
