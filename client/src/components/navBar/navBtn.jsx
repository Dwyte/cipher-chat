import React from "react";
import styled from "styled-components";

const NavBtn = ({ children, isActive, handleClick }) => {
  const NavButton = styled.button`
    ${isActive &&
      `background: #2e2e2e;
    color: white;
    border-color: #3e3e3e;`}
  `;

  return (
    <div>
      <NavButton onClick={handleClick}>{children}</NavButton>
    </div>
  );
};

export default NavBtn;
