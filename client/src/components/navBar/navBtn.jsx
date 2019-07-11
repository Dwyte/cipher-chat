import React from "react";

const NavBtn = ({ fa, label, handleClick }) => {
  return (
    <div>
      <button
        onClick={handleClick}
      >
        <i className={fa} /> {label}
      </button>
    </div>
  );
};

export default NavBtn;
