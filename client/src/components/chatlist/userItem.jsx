import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ReactTooltip from "react-tooltip";
import { getChats } from "../../services/chatService";
const MD5 = CryptoJS.MD5;
const SHA256 = CryptoJS.SHA256;

const UserItem = ({ user, currUser, history, setChannel, setPrivChannel }) => {
  const [messages, setMessages] = useState(0);

  useEffect(() => {
    const getMsgs = async () => {
      const filter = {
        channel: getChannelId(),
        pbkHash: SHA256(user.publicKey).toString()
      };

      const { data: chats } = await getChats(filter);

      setMessages(chats.length);
    };

    getMsgs();
     // eslint-disable-next-line
  }, []);

  const getChannelId = () => {
    const { publicKey: userPbk } = user;
    const { publicKey: cUserPnk } = currUser;
    const sorted = [userPbk, cUserPnk].sort();
    const channelId = MD5(sorted.join()).toString();

    return channelId;
  };

  const handleChannelOpen = () => {
    const channelId = getChannelId();

    localStorage.setItem("chatmate_pbk", user.publicKey);
    setPrivChannel(user.username);
    setChannel(channelId);

    history.push("/chat/ch/" + channelId);
  };

  return (
    <div className="container-item mb">
      <ReactTooltip place="left" effect="solid" />
      <div>
        <b className="badge">{messages}</b> <b>{user.username} </b>
      </div>

      <div>
        <i
          className="fas fa-info-circle"
          data-tip={user.username === currUser.username ? "You" : user.bio}
        />{" "}
        <i className="fas fa-comment" onClick={handleChannelOpen} />
      </div>
    </div>
  );
};

export default UserItem;
