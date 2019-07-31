import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  background: #e8e8e8;
  max-height: 425px;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.75);
  text-align: left !important;
`;

const Card = ({ children }) => {
  return <CardDiv>{children}</CardDiv>;
};

export default Card;
