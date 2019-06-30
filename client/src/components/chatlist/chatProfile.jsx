import React from "react";

const ChatProfile = ({ data }) => {
  return (
    <div className="container-item mt">
      {data.username} <button>Chat</button>
    </div>
  );
};

export default ChatProfile;
