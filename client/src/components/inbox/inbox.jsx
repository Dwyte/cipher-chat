import React, { useState, useEffect } from "react";
import Container from "../container";
import styled from "styled-components";
import Badge from "../badge";
import { getPrivateChannels } from "../../services/chatService";
import Axios from "axios";
import { SHA256 } from "crypto-js";
import ContainerItem from "../containerItem";

const InboxContainer = styled(Container)`
  height: 405px;
`;

const Inbox = ({ history }) => {
  const [channels, setChannels] = useState([]);

  const source = Axios.CancelToken.source();
  useEffect(() => {
    async function getChannels() {
      try {
        const pbkHash = SHA256(localStorage.getItem("pbk")).toString();
        const { data: res } = await getPrivateChannels(pbkHash, {
          cancelToken: source.token
        });
        setChannels(res);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    }

    getChannels();

    return () => {
      source.cancel();
    };
  }, []);

  function populateInbox() {
    return channels.map(item => {
      const { channel, seen, chatmate } = item;
      const { username, publicKey } = chatmate;

      return (
        <ContainerItem key={channels.indexOf(item)} isDark={!seen}>
          <div>
            <b>{username}</b>
          </div>
          <div>
            <i
              className="fas fa-envelope-open-text"
              onClick={() => openChannel(channel, publicKey, username)}
            />
          </div>
        </ContainerItem>
      );
    });
  }

  function openChannel(channel, chatmatePbk, chatmate) {
    localStorage.setItem("chatmate_pbk", chatmatePbk);
    localStorage.setItem("chatmate", chatmate);
    history.push("/chat/ch/" + channel);
  }

  return (
    <InboxContainer>
      {channels.length ? (
        populateInbox()
      ) : (
        <Badge>You haven't recieved any private messages yet.</Badge>
      )}
    </InboxContainer>
  );
};

export default Inbox;
