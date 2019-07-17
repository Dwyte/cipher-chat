import React from "react";
import CryptoJS from "crypto-js";
const MD5 = CryptoJS.MD5;

const UserItem = ({ user, currUser, history, setChannel, setPrivChannel }) => {
  const handleChannelOpen = () => {
    const { publicKey: userPbk } = user;
    const { publicKey: cUserPnk } = currUser;
    const sorted = [userPbk, cUserPnk].sort();
    const channelId = MD5(sorted.join()).toString();

    localStorage.setItem("chatmate_pbk", user.publicKey);
    setPrivChannel(user.username);
    setChannel(channelId);

    history.push("/chat/ch/" + channelId);
  };

  return (
    <div className="container-item mb">
      <b>{user.username}</b>
      <div>
        {/* <span className="badge">1</span> */}
        <button onClick={handleChannelOpen}>
          <i className="fas fa-comment" />
        </button>
      </div>
    </div>
  );
};

export default UserItem;
