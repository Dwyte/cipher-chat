import React from "react";
import ChatProfile from "./chatProfile";

const ChatList = () => {
  const chatList = [
    { username: "NickieSzaboe" },
    { username: "VitaleachBUTT3r1n" },
    { username: "AnOnieMouze" },
    { username: "Mystique69" }
  ];

  return (
    <div className="container">
        <input placeholder="Search for someone to chat..."/>
      {chatList.map(user => (
        <ChatProfile data={user}/>
      ))}
    </div>
  );
};

export default ChatList;
