/*jshint esversion: 8 */

import React, { useState, useEffect } from "react";
import UserItem from "./userItem";
import "./userList.css";
import { searchUsers } from "../../services/userService";
import Axios from "axios";

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

  // const filteredUsers = users.filter(u =>
  //   u.username.match(new RegExp(search + ".*", "i"))
  // );

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <React.Fragment>
      <div className="list mb">
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
      </div>

      <input
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for someone to chat..."
      />
    </React.Fragment>
  );
};

export default UserLists;
