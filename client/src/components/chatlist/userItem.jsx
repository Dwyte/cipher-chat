import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ReactTooltip from "react-tooltip";
import { getChats } from "../../services/chatService";
import Axios from "axios";
const MD5 = CryptoJS.MD5;
const SHA256 = CryptoJS.SHA256;

const UserItem = ({ user, currUser, history, setChannel, setPrivChannel }) => {
  const [messages, setMessages] = useState(0);

  useEffect(() => {
    const source = Axios.CancelToken.source();

    const getMsgsLen = async () => {
      try {
        const filter = {
          channel: getChannelId(),
          pbkHash: SHA256(user.publicKey).toString()
        };

        const { data: chats } = await getChats(filter, {
          cancelToken: source.token
        });

        setMessages(chats.length);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    };

    getMsgsLen();

    return () => {
      source.cancel();
    };
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
