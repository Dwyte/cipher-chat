import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const I = styled.i`
  cursor: pointer;
`;

const Status = styled.i`
  font-size: 10px;
  color: ${({ isOnline }) => (isOnline ? "#000" : "#7e7e7e")};
`;

const OnlineUser = ({ user, currUser, handleChannelOpen }) => {
  return (
    <Container>
      <ReactTooltip place="left" effect="solid" />
      <div>
        <Status className="fas fa-circle" isOnline={Boolean(user.status)} />{" "}
        <b>{user.username}</b>
      </div>

      <div>
        <I
          className="fas fa-info-circle"
          data-tip={user.username === currUser.username ? "You" : user.bio}
        />{" "}
        <I
          className="fas fa-comment"
          onClick={() => handleChannelOpen(currUser, user)}
        />
      </div>
    </Container>
  );
};

export default OnlineUser;
