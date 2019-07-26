import React from "react";
import styled from "styled-components";

const NavButton = styled.button`
  ${props =>
    props.isActive &&
    `
      background: #2e2e2e;
      color: white;
      border-color: #3e3e3e;
    `}
  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px #2e2e2e;
  }
`;

const NavBtn = ({ children, isActive, handleClick }) => {
  return (
    <div>
      <NavButton onClick={handleClick} isActive={isActive}>
        {children}
      </NavButton>
    </div>
  );
};

export default NavBtn;
