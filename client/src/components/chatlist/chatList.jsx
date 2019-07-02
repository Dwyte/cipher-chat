import React from "react";
import ChatProfile from "./chatProfile";
import './chatlist.css'

const ChatList = () => {
  const chatList = [
    { username: "NickieSzaboe" },
    { username: "VitaleachBUTT3r1n" },
    { username: "AnOnieMouze" },
    { username: "Mystique69" },
    { username: "NickieSzaboe" },
    { username: "VitaleachBUTT3r1n" },
    { username: "AnOnieMouze" },
    { username: "Mystique69" },
    { username: "NickieSzaboe" },
    { username: "VitaleachBUTT3r1n" },
    { username: "AnOnieMouze" },
    { username: "Mystique69" }
  ];

  return (
    <React.Fragment>
      <div className="list mb">
        {chatList.map(user => (
          <ChatProfile key={chatList.indexOf(user)} data={user} />
        ))}
      </div>

      <input placeholder="Search for someone to chat..." />
    </React.Fragment>
  );
};

export default ChatList;
