import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ChatBox from "../chatbox/chatbox";
import UserLists from "../chatlist/chatList";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import { getUserProfile, updateUser } from "../../services/userService";
import "./chat.css";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000");

const Chat = ({ history }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (socket) console.log("Socket Connected!");
    else console.error("Sockeet connection failed.");

    const getUser = async () => {
      const { data: user } = await getUserProfile();

      setUser(user);
    };

    getUser();
  }, []);

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
            path="/chat/global"
            render={() => <ChatBox user={user} channel="global" />}
          />
          <Route path="/chat/list" component={UserLists} />
          <Redirect from="/chat" to="/chat/list" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Chat;
