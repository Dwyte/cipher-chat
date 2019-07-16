import React from "react";
import "./navBar.css";
import NavBtn from "./navBtn";

const NavBar = ({ history, location, setChannel }) => {
  return (
    <div className="container-item nav mb">
      <div className="nav-grid">
        <NavBtn
          fa="fas fa-search"
          label=""
          className={location.pathname !== "/chat/ch/global" ? "active" : ""}
          handleClick={() => history.push("/chat/search")}
        />

        <NavBtn
          fa="fas fa-globe"
          label="Global"
          className={location.pathname === "/chat/ch/global" ? "active" : ""}
          handleClick={() => {
            history.push("/chat/ch/global");
            setChannel("global");
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
