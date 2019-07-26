import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  box-shadow: 0;
  padding: 1rem;
  height: 2.25em;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);

  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px #2e2e2e;
  }
`;

const Input = props => {
  return <InputField {...props} />;
};

export default Input;
