import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ReactTooltip from "react-tooltip";
import { getChats } from "../../services/chatService";
import Axios from "axios";
import styled from "styled-components";
const MD5 = CryptoJS.MD5;
const SHA256 = CryptoJS.SHA256;

const Container = styled.div`
  background: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Badge = styled.b`
  color: white;
  padding: 2px 3px;
  font-size: 10px;
  background: #2e2e2e;
  font-weight: bold;
`;

const I = styled.i`
  cursor: pointer;
`;

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
    <Container>
      <ReactTooltip place="left" effect="solid" />
      <div>
        <Badge className="badge">{messages}</Badge>
        <b>{user.username} </b>
      </div>

      <div>
        <I
          className="fas fa-info-circle"
          data-tip={user.username === currUser.username ? "You" : user.bio}
        />
        {" "}
        <I className="fas fa-comment" onClick={handleChannelOpen} />
      </div>
    </Container>
  );
};

export default UserItem;
