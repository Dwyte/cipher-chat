import React, { useState } from "react";
import "./navBar.css";
import NavBtn from "./navBtn";

const NavBar = ({ history, setChannel }) => {
  const [navs, setNavs] = useState([
    {
      fa: "fas fa-search",
      label: "",
      handleClick: () => history.push("/chat/search")
    },
    {
      fa: "fas fa-globe",
      label: "Global",
      handleClick: () => {
        history.push("/chat/ch/global");
        setChannel("global");
      }
    }
  ]);

  return (
    <div className="container-item nav mb">
      <div className="nav-grid">
        {navs.map(nav => (
          <NavBtn key={navs.indexOf(nav)} {...nav}/>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
