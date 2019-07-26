import React from "react";
import styled from "styled-components";

const Message = styled.div`
  max-width: 250px;
  display: inline-block;
  overflow-wrap: break-word;
  color: white;
  font-size: 15px;
  padding: 5px 5px;
  background: #2e2e2e;
  text-align: left !important;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  
  cursor: pointer;
`;

const ChatMsg = ({ isSecret, decrypted, message, ...rest }) => {
  function displayMessage() {
    if (isSecret) if (!decrypted) return <i className="fas fa-lock" />;

    return message;
  }

  return <Message {...rest}>{displayMessage()}</Message>;
};

export default ChatMsg;
