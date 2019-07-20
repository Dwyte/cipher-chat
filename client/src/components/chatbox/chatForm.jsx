import React, { useState } from "react";
import ReactTooltip from "react-tooltip";


const ChatForm = ({ sendMessage, isSecret }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSendEvent = e => {
    e.preventDefault();

    if (message === "") return;

    sendMessage(message);

    setMessage("");
  };

  const inputPlaceholder = isSecret
    ? "Private Channel - Encrypted - 10msgs max"
    : "Global Channel - Plain Text - 100msgs max";

  return (
    <React.Fragment>
      <ReactTooltip place="top" effect="solid"/>

      <div className="message-form">
        <form onSubmit={handleSendEvent}>
          <input
            value={message}
            onChange={handleMessageChange}
            minLength="1"
            maxLength="1000"
            data-tip={inputPlaceholder}
            placeholder="Start Chatting..."
            type="text"
            required
          />
        </form>
      </div>

      <div className="message-submit">
        <button onClick={handleSendEvent}>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChatForm;
