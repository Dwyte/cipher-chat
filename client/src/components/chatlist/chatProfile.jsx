import React from "react";

const ChatProfile = ({ data }) => {
  return (
    <div className="container-item mb">
      <b>{data.username}</b> <button> <i className="fas fa-comment" /></button>
    </div>
  );
};

export default ChatProfile;
