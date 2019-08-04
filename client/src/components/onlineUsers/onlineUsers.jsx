import React, { useState, useEffect } from "react";
import OnlineUser from "./onlineUser";
import Axios from "axios";
import Input from "../input";
import { searchUsers } from "../../services/userService";
import Container from "../container";
import Badge from "../badge";

const OnlineUsers = ({ user, socket, handleChannelOpen }) => {
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

  socket.on("user-connected", async _user => {
    if (users.find(u => u.username === _user.username) !== undefined) return;

    setUsers([...users, _user]);
  });

  socket.on("user-disconnected", async _user => {
    if (users.find(u => u.username === _user.username) === undefined) return;

    let onlineUsers = [...users];

    onlineUsers = onlineUsers.filter(u => u.username !== _user.username);

    setUsers(onlineUsers);
  });

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  function populateUsers() {
    if (!users) return <Badge>Noone's Online...</Badge>;

    return users.map(
      _user =>
        _user.username !== user.username && (
          <OnlineUser
            key={users.indexOf(_user)}
            user={_user}
            currUser={user}
            handleChannelOpen={handleChannelOpen}
          />
        )
    );
  }

  return (
    <React.Fragment>
      <Container>{populateUsers()}</Container>

      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search user here..."
        autoFocus
      />
    </React.Fragment>
  );
};

export default OnlineUsers;
