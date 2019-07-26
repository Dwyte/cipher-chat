import React from "react";
import avatar from "../../images/cc-icon.png";
import styled from "styled-components";

const AvatarDiv = styled.div`
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 2;
  margin: auto;
  height: 40px;

  img{
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 1px)!important;
  }

`;

const Avatar = () => {
  return (
    <AvatarDiv>
      <img alt="anon" src={avatar} width="50" />
    </AvatarDiv>
  );
};

export default Avatar;
