import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import cryptico from "cryptico";
import ChatBox from "../chatbox/chatbox";
import UserLists from "../chatlist/userLists";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import { getUserProfile, updateUser } from "../../services/userService";
import "./chat.css";

import openSocket from "socket.io-client";
const socket = openSocket();

const Chat = ({ history }) => {
  const [user, setUser] = useState({});
  const [userKeys, setUserKeys] = useState({});
  const [chatMatePbk, setChatMatePbk] = useState("");

  useEffect(() => {
    if (socket) console.log("Socket Connected!");
    else console.error("Sockeet connection failed.");

    const getUser = async () => {
      const { data: user } = await getUserProfile();

      setUser(user);
    };

    getUser();

    setUserKeys(getKeys());
  }, []);

  const getKeys = () => {
    const pvk_phrase = localStorage.getItem("pvk_phrase");

    const pvk = cryptico.generateRSAKey(pvk_phrase, 1024);

    const pbk = cryptico.publicKeyString(pvk);

    return {pvk, pbk};
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
        user={user}
      />
      <div className="container chat">
        <NavBar history={history} />

        <Switch>
          <Route
            path="/chat/ch/:channel"
            render={props => (
              <ChatBox {...props} user={user} userKeys={userKeys} chatMatePbk={chatMatePbk} />
            )}
          />
          <Route
            path="/chat/list"
            render={props => (
              <UserLists
                {...props}
                user={user}
                setChatMatePbk={setChatMatePbk}
              />
            )}
          />
          <Redirect from="/chat" to="/chat/list" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Chat;
