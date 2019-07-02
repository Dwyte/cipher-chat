import React from "react";
import displayPic from "./profile.jpg";
import "./profile.css";

const Profile = ({ user }) => {
  return (
    <div className="container grid-container">
      <div className="display-pic">
        <img alt="anon" src={displayPic} width="42" />
      </div>

      <div className="display-name">
        <b>{user.username || "Loading..."}</b>
      </div>

      <div className="display-bio">
        <small>{user.bio || "The Inventor/Creator of Bitcoin"}</small>
      </div>

      <div className="logout">
        <button>
          <i className="fas fa-sign-out-alt" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
