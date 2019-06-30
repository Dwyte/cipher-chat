import React from "react";
import "./chatbubble.css";

const ChatBubble = ({ name, message }) => {
  const parentBubContStyle = name === "You" ? "float-right max-width" : "";
  const bubContStyle = name === "You" ? "float-right text-align-right" : "";

  return (
    <div className={parentBubContStyle}>
      <div id="bubble-container" className={bubContStyle}>
        <b>{name}</b> <br />
        <div id="message-bubble">{message}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
