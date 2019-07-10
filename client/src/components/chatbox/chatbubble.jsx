import React from "react";
import "./chatbubble.css";

const ChatBubble = ({ username, name, message, timestamp }) => {
  const parentBubContStyle = name === username ? "float-right max-width" : "";
  const bubContStyle = name === username ? "float-right text-align-right" : "";
  const displayName = name === username ? "You" : name;

  const displayTimestamp = () => {
    const dateTimestamp = new Date(timestamp);

    const month = dateTimestamp.getMonth();
    const date = dateTimestamp.getDate();
    const year = dateTimestamp.getFullYear();
    const hours = dateTimestamp.getHours();
    const minutes = dateTimestamp.getMinutes();

    return `${month}/${date}/${year} - ${hours}:${minutes}`;
  };

  return (
    <div className={parentBubContStyle}>
      <div id="bubble-container" className={bubContStyle}>
        <b>{displayName}</b> <br />
        <div id="message-bubble">{message}</div> <br />
        <small id="timestamp">{displayTimestamp()}</small>
      </div>
    </div>
  );
};

export default ChatBubble;
