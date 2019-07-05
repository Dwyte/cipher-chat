import React, { useState } from "react";
import "./navBar.css";
import NavBtn from "./navBtn";

const NavBar = ({ history }) => {
  const [navs, setNavs] = useState([
    { fa: "fas fa-search", label: "", link: "/chat/search" },
    { fa: "fas fa-globe", label: "Global", link: "/chat/global" },
    { fa: "fas fa-envelope", label: "Nicki...", link: "/chat/search" }
  ]);

  const navigate = link => {
    history.push(link);
  };

  return (
    <div className="container-item nav mb">
      <div className="nav-grid">
        {navs.map(nav => (
          <NavBtn key={navs.indexOf(nav)} {...nav} navigate={navigate}/>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
