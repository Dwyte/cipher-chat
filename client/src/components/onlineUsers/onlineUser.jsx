import React, { useEffect } from "react";
import { MD5 } from "crypto-js";
import ReactTooltip from "react-tooltip";
import Axios from "axios";
import styled from "styled-components";

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

const I = styled.i`
  cursor: pointer;
`;

const OnlineUser = ({ user, currUser, history, setChannel, setPrivChannel, flipOpenNav }) => {

  useEffect(() => {
    const source = Axios.CancelToken.source();

    // const getMsgsLen = async () => {
    //   try {
    //     const filter = {
    //       channel: getChannelId(),
    //       pbkHash: SHA256(user.publicKey).toString()
    //     };

    //     const { data: chats } = await getChats(filter, {
    //       cancelToken: source.token
    //     });

    //     setMessages(chats.length);
    //   } catch (error) {
    //     if (Axios.isCancel(error)) console.log("Caught Cancel");
    //     else throw error;
    //   }
    // };

    // getMsgsLen();

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
    flipOpenNav(false);

    history.push("/chat/ch/" + channelId);
  };

  return (
    <Container>
      <ReactTooltip place="left" effect="solid" />
      <div>
        <b>{user.username} </b>
      </div>

      <div>
        <I
          className="fas fa-info-circle"
          data-tip={user.username === currUser.username ? "You" : user.bio}
        />{" "}
        <I className="fas fa-comment" onClick={handleChannelOpen} />
      </div>
    </Container>
  );
};

export default OnlineUser;
