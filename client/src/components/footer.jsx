import React from "react";
import Card from "./card";
import styled from "styled-components";

const FooterText = styled.div`
  font-size: 12px;
  text-align: center;
  padding: 3px;
`;

const Footer = () => {
  return (
    <Card>
      <FooterText>
        CipherChat |{" "}
        <a href="https://github.com/Dwyte/CipherChat">Source Code</a> <br />
      </FooterText>
    </Card>
  );
};

export default Footer;
