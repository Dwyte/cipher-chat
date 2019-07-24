import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  background: #e8e8e8;
  padding: 5px;
  max-width: 425px;
  margin-bottom: 5px;
`;

const Card = ({ children }) => {
  return <CardDiv>{children}</CardDiv>;
};

export default Card;
