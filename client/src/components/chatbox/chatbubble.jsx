import React from "react";
import "./chatbubble.css";

const ChatBubble = ({ username, name, message }) => {
  const parentBubContStyle = name === username ? "float-right max-width" : "";
  const bubContStyle = name === username ? "float-right text-align-right" : "";
  const displayName = name === username ? "You" : name;

  return (
    <div className={parentBubContStyle}>
      <div id="bubble-container" className={bubContStyle}>
        <b>{displayName}</b> <br />
        <div id="message-bubble">{message}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
