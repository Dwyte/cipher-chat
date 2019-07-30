import React from "react";
import NavBtn from "./navBtn";
import styled from "styled-components";

const Nav = styled.div`
  position: relative;
  left: -50%;
  background: #e8e8e8;
  padding: 0px 5px 2px 5px;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;

  i {
    cursor: pointer;
  }
`;

const NavBar = ({
  history,
  location,
  setChannel,
  privChannel,
  setPrivChannel
}) => {
  return (
    <div style={{ position: "absolute", left: "50%" }}>
      <Nav>
        <i className="fas fa-envelope" />{" "}
        <i
          onClick={() => {
            setPrivChannel("");
            setChannel("global");
            history.push("/chat/ch/global");
          }}
          className="fas fa-globe"
        />{" "}
        <i
          className="fas fa-search"
          onClick={() => {
            setPrivChannel("");
            history.push("/chat/list");
          }}
        />
      </Nav>
    </div>
  );
};

export default NavBar;
