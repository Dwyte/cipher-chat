import React from "react";

const DisplayName = ({ username }) => {
  return (
    <div id="display-name">
      <b>{username || "Loading..."}</b>
    </div>
  );
};

export default DisplayName;
