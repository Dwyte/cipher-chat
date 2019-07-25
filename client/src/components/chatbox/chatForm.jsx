import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Input from "../input";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 5px;
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 11;
  grid-row-end: 12;
`;

const MsgInput = styled(Input)`
  width: 100%;
`;

const ChatForm = ({ sendMessage, isSecret }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSendEvent = e => {
    e.preventDefault();

    if (message.trim() === "") return;

    sendMessage(message);

    setMessage("");
  };

  const inputPlaceholder = isSecret
    ? "Private Channel - Encrypted - 10msgs max"
    : "Global Channel - Plain Text - 100msgs max";

  return (
    <React.Fragment>
      <ReactTooltip place="top" effect="solid" />

      <Container>
        <form onSubmit={handleSendEvent}>
          <MsgInput
            value={message}
            onChange={handleMessageChange}
            minLength="1"
            maxLength="500"
            data-tip={inputPlaceholder}
            placeholder="Type Something..."
            type="Text"
            autoFocus
            required
          />
        </form>
      </Container>
    </React.Fragment>
  );
};

export default ChatForm;
