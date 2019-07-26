import React from "react";
import styled from "styled-components";

const NameDiv = styled.div`
  grid-column-start: 2;
  grid-column-end: 11;
  padding: 3px 0px 0px 5px;

  color: white;

  h1{
    margin: 0px;
  }
`;

const Username = ({ username }) => {
  return (
    <NameDiv>
      <h1>{username || "CipherChat"}</h1>
    </NameDiv>
  );
};

export default Username;
