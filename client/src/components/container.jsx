import React from "react";
import styled from "styled-components";

const ContainerDiv = styled.div`
  background: white;
  height: 367px;
  padding: 5px;
  overflow-y: auto;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  scrollbar-color: #2e2e2e #aeaeae;
  scrollbar-width: thin;
  margin-bottom: 5px;

  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px #2e2e2e;
  }

  overflow-x: hidden;
`;

const Container = ({ children, ...rest }) => {
  return <ContainerDiv {...rest}>{children}</ContainerDiv>;
};

export default Container;
