import React from "react";
import "./navBar.css";

const NavBtn = ({ fa, label, className, handleClick }) => {

  return (
    <div >
      <button
        onClick={handleClick}
        className={className}
      >
        <i className={fa} /> {label}
      </button>
    </div>
  );
};

export default NavBtn;
