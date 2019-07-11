import React from "react";
import CryptoJS from "crypto-js";
const MD5 = CryptoJS.MD5;

const UserItem = ({ user, currUser, history, setChatMatePbk }) => {
  const handleChannelOpen = () => {
    const { publicKey: userPbk } = user;
    const { publicKey: cUserPnk } = currUser;
    const sorted = [userPbk, cUserPnk].sort();
    const channelId = MD5(sorted.join());

    setChatMatePbk(user.publicKey);

    history.push("/chat/ch/" + channelId);
  };

  return (
    <div className="container-item mb">
      <b>{user.username}</b>
      <button onClick={handleChannelOpen}>
        {" "}
        <i className="fas fa-comment" />
      </button>
    </div>
  );
};

export default UserItem;
