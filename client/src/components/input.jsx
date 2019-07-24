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
`;

const Input = props => {
  return <InputField {...props} />;
};

export default Input;
