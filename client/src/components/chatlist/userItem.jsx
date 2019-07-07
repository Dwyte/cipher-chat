import React from "react";
import CryptoJS from "crypto-js";
const MD5 = CryptoJS.MD5;

const UserItem = ({ user, currUser, history }) => {
  const handleChannelOpen = () => {
    const { auth: userAuth } = user;
    const { auth: currUserAuth } = currUser;
    const sorted = [userAuth, currUserAuth].sort();
    const channelId = MD5(sorted.join());

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
