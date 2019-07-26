import React from "react";
import Logo from "../../images/cc-icon.png";
import styled from "styled-components";

const TitleDiv = styled.div`
  color: #fff;
  h1 {
    margin: 0px;
  }
  p {
    margin-top: 0px;
    font-size: 12px;
  }
`;

const Title = () => {
  return (
    <TitleDiv>
      <img src={Logo} width="50px" />
      <h1>CipherChat</h1>
      <p>
        An end-to-end encrypted Instant Messaging App <br />
        Chat secretly and securely on the web.
      </p>
    </TitleDiv>
  );
};

export default Title;
