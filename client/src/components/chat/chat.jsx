import React, { useState, useEffect } from "react";
import cryptico from "cryptico";
import { Route, Switch, Redirect } from "react-router-dom";
import ChatBox from "../chatbox/chatbox";
import UserLists from "../chatlist/userLists";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import { getUserProfile, updateUser } from "../../services/userService";
import "./chat.css";
import Axios from "axios";
import openSocket from 'socket.io-client';
const socket = openSocket(
  process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:4200'
);

const Chat = ({ history, location }) => {
  const [user, setUser] = useState({});
  const [channel, setChannel] = useState("global");
  const [userKeys, setUserKeys] = useState({});
  const [privChannel, setPrivChannel] = useState("");

  useEffect(() => {
    socket.connect();

    const source = Axios.CancelToken.source();

    const getUser = async () => {
      try {
        const { data: user } = await getUserProfile({
          cancelToken: source.token
        });
        setUser(user);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    };

    setUserKeys(getKeys());

    getUser();
  }, []);

  const getKeys = () => {
    const pvk_phrase = localStorage.getItem("pvk_phrase");

    const pvk = cryptico.generateRSAKey(pvk_phrase, 1024);

    const pbk = cryptico.publicKeyString(pvk);

    return { pvk, pbk };
  };

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
                userKeys={userKeys}
              />
            )}
          />
          <Route
            path="/chat/list"
            render={props => (
              <UserLists
                {...props}
                user={user}
                setChannel={setChannel}
                setPrivChannel={setPrivChannel}
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
