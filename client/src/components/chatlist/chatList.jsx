import React, { useState, useEffect } from "react";
import ChatProfile from "./chatProfile";
import "./chatlist.css";
import { getAllUsers } from "../../services/userService";

const UserLists = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const { data: users } = await getAllUsers();

      setUsers(users);
    };

    getUsers();
  }, []);

  return (
    <React.Fragment>
      <div className="list mb">
        {users.map(user => (
          <ChatProfile key={users.indexOf(user)} data={user} />
        ))}
      </div>

      <input
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        placeholder="Search for someone to chat..."
      />
    </React.Fragment>
  );
};

export default UserLists;
