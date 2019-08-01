import React, { useState, useEffect } from "react";
import OnlineUser from "./onlineUser";
import Axios from "axios";
import Input from "../input";
import { searchUsers } from "../../services/userService";

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

  const source = Axios.CancelToken.source();
  useEffect(() => {
    async function getUsers() {
      try {
        const { data: users } = search
          ? await searchUsers(
              {
                username: { $regex: `${search}.*`, $options: "i" }
              },
              {
                cancelToken: source.token
              }
            )
          : await getOnlineUsers();

        setUsers(users);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    }

    if (user) getUsers();

    return () => {
      console.log("Cleaning...");
      source.cancel();
      socket.off("user-connected");
    };
  }, [user, search]);

  async function getOnlineUsers() {
    return await searchUsers(
      { status: { $ne: "" } },
      {
        cancelToken: source.token
      }
    );
  }

  socket.on("user-connected", async () => {
    const { data: onlineUsers } = await getOnlineUsers();

    setUsers(onlineUsers);
  });

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <React.Fragment>
      <Container>
        {users.map(
          _user =>
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
        placeholder="User not online? Search here..."
        autoFocus
      />
    </React.Fragment>
  );
};

export default OnlineUsers;
