import React from "react";
import styled from "styled-components";
import Input from "../input";

const Container = styled.div`
  margin-bottom: 5px;
`;

const Error = styled.div`
  font-style: italic;
  vertical-align: top;
  font-size: 10px;
`;

const InputForm = ({ placeholder, errors, ...rest }) => {
  const name = placeholder.toLowerCase().replace(/\s+/g, '');

  return (
    <Container>
      <Input name={name} placeholder={placeholder} {...rest} />
      <Error>{errors}</Error>
    </Container>
  );
};

export default InputForm;
