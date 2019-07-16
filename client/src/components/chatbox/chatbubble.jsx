import React from "react";
import cryptico from "cryptico";
import "./chatbubble.css";

const ChatBubble = ({ username, msgObj, isSecret, userKeys, decryptMsg }) => {
  let { name, message, timestamp, decrypted } = msgObj;
  
  if (isSecret)
    if (!decrypted) name = cryptico.decrypt(name, userKeys.pvk).plaintext;

  const parentBubContStyle = name === username ? "float-right max-width" : "";
  const bubContStyle = name === username ? "float-right text-align-right" : "";
  const displayName = name === username ? "You" : name;

  const displayTimestamp = () => {
    if (isSecret) if (!decrypted) return "Decrypt the Message";

    const dateTimestamp = new Date(timestamp);

    const month = dateTimestamp.getMonth();
    const date = dateTimestamp.getDate();
    const year = dateTimestamp.getFullYear();
    const hours = dateTimestamp.getHours();
    const minutes = dateTimestamp.getMinutes();

    return `${month}/${date}/${year} - ${hours}:${minutes}`;
  };

  const displayMessage = () => {
    if (isSecret)
      if (!decrypted)
        return <i className="fas fa-lock" onClick={handleDecryptMessage} />;

    return message;
  };

  const handleDecryptMessage = () => {
    decryptMsg(msgObj);
  };

  return (
    <div className={parentBubContStyle}>
      <div id="bubble-container" className={bubContStyle}>
        <b>{displayName}</b> <br />
        <div id="message-bubble" className="pointer">{displayMessage()}</div> <br />
        <small id="timestamp">{displayTimestamp()}</small>
      </div>
    </div>
  );
};

export default ChatBubble;
