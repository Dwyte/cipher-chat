import React, { useState, useEffect } from "react";
import OnlineUser from "./onlineUser";
import Axios from "axios";
import Input from "../input";
import { getOnlineUsers } from "../../services/onlineUsersService";
import Container from "../container";

const OnlineUsers = ({
  user,
  history,
  socket,
  setChannel,
  setPrivChannel,
  flipOpenNav
}) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const source = Axios.CancelToken.source();

    const getUsers = async () => {
      try {
        const onlineUsers = await getOnlineUsers({
          cancelToken: source.token
        });

        setUsers(onlineUsers);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    };

    getUsers();

    return () => {
      console.log("Cleaning...");
      source.cancel();
    };
  }, [search]);

  socket.on("user-connected", newUsers => {
    let onlineUsers = [...newUsers];

    setUsers(onlineUsers);
  });

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <React.Fragment>
      <Container>
        {users.map(
          ({ user: _user }) =>
            _user.username !== user.username && (
              <OnlineUser
                key={users.indexOf(_user)}
                user={_user}
                currUser={user}
                history={history}
                setChannel={setChannel}
                setPrivChannel={setPrivChannel}
                flipOpenNav={flipOpenNav}
              />
            )
        )}
      </Container>

      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for someone to chat..."
        autoFocus
      />
    </React.Fragment>
  );
};

export default OnlineUsers;
