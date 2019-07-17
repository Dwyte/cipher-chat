import React, { useState } from "react";
import cryptico from "cryptico";
import "./chatbubble.css";

const ChatBubble = ({
  username,
  msgObj,
  isSecret,
  userKeys,
  prevMsg,
  decryptMsg
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  
  let { name, message, timestamp, decrypted } = msgObj;

  if (isSecret)
    if (!decrypted) {
      name = cryptico.decrypt(name, userKeys.pvk).plaintext;
      if (name === username) decryptMsg(msgObj);
    }

  const parentBubContStyle = name === username ? "float-right max-width" : "";
  const bubContStyle = name === username ? "float-right text-align-right" : "";
  const displayName = name === username ? "You" : name;

  const isPrevMsgSenderTheUser = () => {
    if (!prevMsg) return false;

    const { name: prevName } = prevMsg;

    return prevName === name
  }

  const displayDisplayName = () => {
    const displayNameJsx = (
      <React.Fragment>
        <div id="displayName">{displayName}</div>
      </React.Fragment>
    );

    if(isPrevMsgSenderTheUser()) return
    else return displayNameJsx;
  };

  const displayTimestamp = () => {
    if (isSecret) if (!decrypted) return "Decrypt the Message";

    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const dateTimestamp = new Date(timestamp);

    const month = dateTimestamp.getMonth();
    const date = dateTimestamp.getDate();
    const hours = dateTimestamp.getHours();
    const hoursPadded = hours < 10 ? `0${hours}` : hours;
    const minutes = dateTimestamp.getMinutes();
    const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

    const timestampJsx = `${monthNames[month].slice(
      0,
      3
    )} ${date} - ${hoursPadded}:${minutesPadded}`;

    return <div id="timestamp">{timestampJsx}</div>;
  };

  const displayMessage = () => {
    if (isSecret) if (!decrypted) return <i className="fas fa-lock" />;

    return message;
  };

  const handleDecryptMessage = () => {
    decryptMsg(msgObj);
  };

  return (
    <div className={parentBubContStyle}>
      <div id="bubble-container" className={bubContStyle}>
        {displayDisplayName()}
        <div
          id="message-bubble"
          className={`pointer ${isPrevMsgSenderTheUser() ? "mt" : ""}`}
          onClick={
            isSecret
              ? decrypted
                ? () => setShowTimestamp(!showTimestamp)
                : handleDecryptMessage
              :  () => setShowTimestamp(!showTimestamp)
          }
        >
          {displayMessage()}
        </div>
        <br />
        {showTimestamp ? displayTimestamp() : null}
      </div>
    </div>
  );
};

export default ChatBubble;
