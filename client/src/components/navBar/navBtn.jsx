import React from "react";

const NavBtn = ({link, fa, label, navigate}) => {
  return (
    <div>
      <button
        onClick={() => {
            navigate(link);
        }}
      >
        <i className={fa} /> {label}
      </button>
    </div>
  );
};

export default NavBtn;
