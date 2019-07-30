import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ChatBox from "../chatbox/chatbox";
import OnlineUsers from "../onlineUsers/onlineUsers";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import Card from "../card";
import crypto from "crypto";
import { getUserProfile, updateUser } from "../../services/userService";
import Axios from "axios";
import openSocket from "socket.io-client";
const socket = openSocket(
  process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:4200"
);

const Chat = ({ history, location }) => {
  const [user, setUser] = useState({});
  const [channel, setChannel] = useState("global");
  const [privChannel, setPrivChannel] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const userECDH = getECDH();

  useEffect(() => {
    socket.connect();

    const source = Axios.CancelToken.source();

    const getUser = async () => {
      try {
        const { data: user } = await getUserProfile({
          cancelToken: source.token
        });
        setUser(user);

        if (!isOnline) {
          socket.emit("new-user", user);
          setIsOnline(true);
        }
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    };

    getUser();

    history.push("/chat/list");

    return () => {
      socket.disconnect();
    };
  }, []);

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

  const handleUpdateUserBio = async bio => {
    const _user = { ...user };
    _user.bio = bio;

    try {
      await updateUser(user._id, _user);
      setUser(_user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Profile
        onUpdateBio={handleUpdateUserBio}
        history={history}
        socket={socket}
        user={user}
      />
      <Card>
        <NavBar
          history={history}
          location={location}
          setChannel={setChannel}
          privChannel={privChannel}
          setPrivChannel={setPrivChannel}
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
              />
            )}
          />
          <Route
            path="/chat/list"
            render={props => (
              <OnlineUsers
                {...props}
                user={user}
                socket={socket}
                setChannel={setChannel}
                setPrivChannel={setPrivChannel}
              />
            )}
          />
          <Redirect from="/chat" to="/chat/list" />
        </Switch>
      </Card>
    </React.Fragment>
  );
};

export default Chat;
