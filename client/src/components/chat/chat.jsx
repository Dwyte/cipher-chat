import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ChatBox from "../chatbox/chatbox";
import OnlineUsers from "../onlineUsers/onlineUsers";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import Card from "../card";
import crypto from "crypto";
import { MD5 } from "crypto-js";
import { getUserProfile, updateUser } from "../../services/userService";
import Axios from "axios";
import openSocket from "socket.io-client";
import InboxContainer from "../inbox/inbox";
const socket = openSocket(
  process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:4200"
);

const Chat = ({ history, location }) => {
  const [user, setUser] = useState({});
  const [channel, setChannel] = useState("global");
  const [isOnline, setIsOnline] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  const userECDH = getECDH();

  const source = Axios.CancelToken.source();
  useEffect(() => {
    socket.connect();

    async function getUser() {
      try {
        const res = await getUserProfile({
          cancelToken: source.token
        });

        const { data: user } = res;
        setUser(user);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    }

    getUser();

    history.push("/chat/search");
    return () => {
      source.cancel();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const localIsOnline = localStorage.getItem("isOnline");
    if (!localIsOnline) {
      beOnline();
      localStorage.setItem("isOnline", String(true));
    } else {
      const _localIsOnline = JSON.parse(localIsOnline);

      if (_localIsOnline) beOnline();
      else setIsOnline(false);
    }
  }, [user]);

  async function changeStatus() {
    if (isOnline) beOffline();
    else beOnline();
  }

  async function beOnline() {
    const { data: _user } = await updateUser(
      user._id,
      { status: socket.id },
      {
        cancelToken: source.token
      }
    );

    socket.emit("new-user", _user);
    setIsOnline(true);
    localStorage.setItem("isOnline", true);
  }

  function beOffline() {
    socket.emit("user-offline");
    setIsOnline(false);
    localStorage.setItem("isOnline", false);
  }

  function getECDH() {
    const pvkStr = localStorage.getItem("pvk");

    const pvkParse = JSON.parse(pvkStr);

    const pvk = Buffer.from(pvkParse.data);

    const ecdh = crypto.createECDH("secp521r1");
    ecdh.setPrivateKey(pvk);

    return ecdh;
  }

  function getPassphrase() {
    const chatMatePbkStr = localStorage.getItem("chatmate_pbk");
    const chatMatePbkParsed = JSON.parse(chatMatePbkStr);
    const chatMatePbk = Buffer.from(chatMatePbkParsed.data);

    if (!userECDH) return console.log("ECDH is null");

    const passphrase = userECDH.computeSecret(chatMatePbk).toString("hex");
    return passphrase;
  }

  async function handleUpdateUserBio(bio) {
    const _user = { ...user };
    _user.bio = bio;

    try {
      await updateUser(user._id, _user);
      setUser(_user);
    } catch (err) {
      console.log(err);
    }
  }

  function flipOpenNav(boolean = !navOpen) {
    setNavOpen(boolean);
  }

  function handleChannelOpen(currUser, user) {
    const channelId = getChannelId(currUser, user);

    localStorage.setItem("chatmate_pbk", user.publicKey);
    localStorage.setItem("chatmate", user.username);

    setChannel(channelId);
    flipOpenNav(false);

    history.push("/chat/ch/" + channelId);
  }

  function getChannelId(currUser, user) {
    const { publicKey: userPbk } = user;
    const { publicKey: cUserPnk } = currUser;

    const sorted = [userPbk, cUserPnk].sort();
    const channelId = MD5(sorted.join()).toString();

    return channelId;
  }

  return (
    <React.Fragment>
      <Profile
        onUpdateBio={handleUpdateUserBio}
        flipOpenNav={flipOpenNav}
        history={history}
        user={user}
        isOnline={isOnline}
        changeStatus={changeStatus}
      />
      <Card>
        <NavBar
          history={history}
          location={location}
          setChannel={setChannel}
          navOpen={navOpen}
          flipOpenNav={flipOpenNav}
        />

        <Switch>
          <Route
            path="/chat/ch/:channel"
            render={props => (
              <ChatBox
                {...props}
                socket={socket}
                user={user}
                channel={channel}
                getPassphrase={getPassphrase}
                handleChannelOpen={handleChannelOpen}
              />
            )}
          />
          <Route
            path="/chat/search"
            render={props => (
              <OnlineUsers
                {...props}
                user={user}
                socket={socket}
                handleChannelOpen={handleChannelOpen}
              />
            )}
          />

          <Route
            path="/chat/privateChannels"
            render={props => (
              <InboxContainer {...props} user={user} history={history} />
            )}
          />

          <Redirect from="/chat" to="/chat/search" />
        </Switch>
      </Card>
    </React.Fragment>
  );
};

export default Chat;
