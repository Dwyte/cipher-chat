import React from "react";
import styled from "styled-components";

const Timestamp = styled.div`
  height: 5px;
  margin: 0px;
  vertical-align: top;
  font-size: 10px;
  padding-bottom: 5px;
`;

const ChatTimestamp = ({isSecret, decrypted, timestamp}) => {
  const getTimestamp = () => {
    if (isSecret) if (!decrypted) return "Decrypt";

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

    return `${monthStr} ${date}, ${dayStr} - ${hoursPadded}:${minutesPadded}`;
  };

  return (
    <Timestamp>
      <i className="fas fa-caret-right" />
      {getTimestamp()}
    </Timestamp>
  );
};

export default ChatTimestamp;
