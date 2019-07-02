import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./chat.css";
import ChatBox from "../chatbox/chatbox";
import ChatList from "../chatlist/chatList";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import { getUserProfile } from "../../services/userService";

const Chat = ({ history }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const {data: user} = await getUserProfile();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <React.Fragment>
      <Profile user={user} />
      <div className="container chat">
        <NavBar history={history} />

        <Switch>
          <Route path="/chat/global" component={ChatBox} />
          <Route path="/chat/list" component={ChatList} />
          <Redirect from="/chat" to="/chat/list" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Chat;
