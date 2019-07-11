import React from "react";

const ChatForm = ({message, sendMessage, handleMessageChange}) => {
  return (
    <React.Fragment>
      <div className="message-form">
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            type="text"
          />
        </form>
      </div>

      <div className="message-submit">
        <button onClick={sendMessage}>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default ChatForm;
