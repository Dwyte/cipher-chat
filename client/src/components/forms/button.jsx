import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  box-shadow: 0;
  padding: 1rem;
  height: 2.25em;
  background-color: #2e2e2e;
  color: white;
  padding: 5px;
`;

const Button = ({ children, ...rest }) => {
  return (
    <Btn id="button" {...rest}>
      {children}
    </Btn>
  );
};

export default Button;
