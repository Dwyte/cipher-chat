import React from "react";
import NavBtn from "./navBtn";
import styled from "styled-components";

const Nav = styled.div`
  display: inline-block;
  background: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const NavGrid = styled.div`
  display: grid;
  grid-column-gap: 3px;
  grid-template-columns: auto auto;
`;

const NavBar = ({
  history,
  location,
  setChannel,
  privChannel,
  setPrivChannel
}) => {
  return (
    <Nav>
      <NavGrid>
        <NavBtn
          isActive={location.pathname === "/chat/list"}
          handleClick={() => {
            setPrivChannel("");
            history.push("/chat/list");
          }}
        >
          <i className="fas fa-envelope" /> {privChannel}
        </NavBtn>
        <NavBtn
          isActive={location.pathname === "/chat/ch/global"}
          handleClick={() => {
            setPrivChannel("");
            setChannel("global");
            history.push("/chat/ch/global");
          }}
        >
          <i className="fas fa-globe" /> Global
        </NavBtn>
      </NavGrid>
    </Nav>
  );
};

export default NavBar;
