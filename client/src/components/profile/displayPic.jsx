import React from "react";
import displayPic from "./profile.png";

const DisplayPic = () => {
  return (
    <div id="display-pic">
      <img alt="anon" src={displayPic} width="42" />
    </div>
  );
};

export default DisplayPic;
