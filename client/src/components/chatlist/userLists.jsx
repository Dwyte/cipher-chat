import React, { useState, useEffect } from "react";
import UserItem from "./userItem";
import { searchUsers } from "../../services/userService";
import Axios from "axios";
import styled from "styled-components";
import Input from "../input";

const List = styled.div`
  height: 362px;
  overflow-y: scroll;

  scrollbar-width: thin;
  scrollbar-color: #2e2e2e #aeaeae;  
  margin-bottom: 5px;
`;

const UserLists = ({ user, history, setChannel, setPrivChannel }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const source = Axios.CancelToken.source();

    const getUsers = async () => {
      try {
        const { data: users } = await searchUsers(
          { regex: `${search}.*` },
          {
            cancelToken: source.token
          }
        );

        setUsers(users);
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

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <React.Fragment>
      <List>
        {users.map(u => (
          <UserItem
            key={users.indexOf(u)}
            user={u}
            currUser={user}
            history={history}
            setChannel={setChannel}
            setPrivChannel={setPrivChannel}
          />
        ))}
      </List>

      <Input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for someone to chat..."
        autoFocus
      />
    </React.Fragment>
  );
};

export default UserLists;
