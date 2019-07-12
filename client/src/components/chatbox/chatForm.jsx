import React, { useState } from "react";

const ChatForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSendEvent = e => {
    e.preventDefault();

    sendMessage(message);

    setMessage("");
  };

  return (
    <React.Fragment>
      <div className="message-form">
        <form onSubmit={handleSendEvent}>
          <input
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            type="text"
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
