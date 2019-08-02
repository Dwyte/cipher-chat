import React from "react";
import ReactTooltip from "react-tooltip";
import ContainerItem from "../containerItem";
import styled from "styled-components";

const Status = styled.i`
  font-size: 10px;
  color: ${({ isOnline }) => (isOnline ? "#000" : "#7e7e7e")};
`;

const OnlineUser = ({ user, currUser, handleChannelOpen }) => {
  return (
    <ContainerItem>
      <ReactTooltip place="left" effect="solid" />
      <div>
        <Status
          className="fas fa-circle"
          isOnline={Boolean(user.status)}
          onClick={() => handleChannelOpen(currUser, user)}
        />{" "}
        <b>{user.username}</b>
      </div>

      <div>
        <i
          className="fas fa-info-circle"
          data-tip={user.username === currUser.username ? "You" : user.bio}
        />{" "}
        <i
          className="fas fa-comment"
          onClick={() => handleChannelOpen(currUser, user)}
        />
      </div>
    </ContainerItem>
  );
};

export default OnlineUser;
