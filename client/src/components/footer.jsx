import React from "react";
import styled from "styled-components";

const FooterText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  padding: 3px;
  color: #fff;

  i {
    cursor: pointer;
  }
`;

const Footer = () => {
  function goto(url) {
    window.location = url;
  }

  return (
    <div>
      <FooterText>
        <i
          onClick={() => goto("https://github.com/Dwyte/CipherChat")}
          className="fab fa-github"
        />{" "}
        <i
          onClick={() => goto("https://twitter.com/DwyteMartin")}
          className="fab fa-twitter"
        />
      </FooterText>
    </div>
  );
};

export default Footer;
