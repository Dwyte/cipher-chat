import React from "react";
import "./profile.css";
import DisplayPic from "./displayPic";
import DisplayName from "./displayName";
import DisplayBio from "./displayBio";

const Profile = ({ user, onUpdateBio }) => {
  const handleLogout = () => {
    localStorage.clear();

    window.location = "/"
  };

  return (
    <div className="container grid-container">
      <DisplayPic />

      <DisplayName username={user.username} />

      <DisplayBio onSave={onUpdateBio} bio={user.bio} />

      <div onClick={handleLogout} id="logout">
        <button className="pointer">
          <i className="fas fa-sign-out-alt" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
