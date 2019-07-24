import React from "react";
import styled from "styled-components";

const NameDiv = styled.div`
  grid-column-start: 2;
  grid-column-end: 11;
  padding: 3px 0px 0px 5px;
`;

const Username = ({ username }) => {
  return (
    <NameDiv>
      <b>{username || "Loading..."}</b>
    </NameDiv>
  );
};

export default Username;
