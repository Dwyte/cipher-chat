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

    const { name: prevName, decrypted: prevDecrypted } = prevMsg;
    const prevNamePlain = isSecret
      ? prevDecrypted
        ? prevName
        : cryptico.decrypt(prevName, userKeys.pvk).plaintext
      : prevName;
    return prevNamePlain === name;
  };

  const displayDisplayName = () => {
    const displayNameJsx = (
      <React.Fragment>
        <div id="displayName">{displayName}</div>
      </React.Fragment>
    );

    if (isPrevMsgSenderTheUser()) return;
    else return displayNameJsx;
  };

  const displayTimestamp = () => {
    if (isSecret) if (!decrypted) return <div id="timestamp">Decrypt</div>;

    const monthNames = [
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

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const dateTimestamp = new Date(timestamp);

    const month = dateTimestamp.getMonth();
    const day = dateTimestamp.getDay();
    const date = dateTimestamp.getDate();
    const hours = dateTimestamp.getHours();
    const hoursPadded = hours < 10 ? `0${hours}` : hours;
    const minutes = dateTimestamp.getMinutes();
    const minutesPadded = minutes < 10 ? `0${minutes}` : minutes;

    const monthStr = monthNames[month].slice(0, 3);
    const dayStr = dayNames[day].slice(0, 3);

    const timestampJsx = `${monthStr} ${date}, ${dayStr} - ${hoursPadded}:${minutesPadded}`;

    return (
      <div id="timestamp">
        <i className="fas fa-caret-right" />
        {timestampJsx}
      </div>
    );
  };

  const displayMessage = () => {
    if (isSecret) if (!decrypted) return <i className="fas fa-lock" />;

    return message;
  };

  const handleDecryptMessage = () => {
    if (!isSecret) return;

    decryptMsg(msgObj);
  };

  return (
    <div className={parentBubContStyle}>
      <div id="bubble-container" className={bubContStyle}>
        {displayDisplayName()}
        <div
          id="message-bubble"
          className={`pointer ${isPrevMsgSenderTheUser() ? "mt-sm" : ""}`}
          onClick={
            isSecret
              ? decrypted
                ? () => setShowTimestamp(!showTimestamp)
                : handleDecryptMessage
              : () => setShowTimestamp(!showTimestamp)
          }
          onMouseLeave={() => setTimeout(() => setShowTimestamp(false), 1250)}
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
