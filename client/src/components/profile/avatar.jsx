import React from "react";
import avatar from "./avatar.jpg";
import styled from "styled-components";

const AvatarDiv = styled.div`
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
  margin: auto;
  height: 40px;
`;

const Avatar = () => {
  return (
    <AvatarDiv>
      <img alt="anon" src={avatar} width="42" />
    </AvatarDiv>
  );
};

export default Avatar;
