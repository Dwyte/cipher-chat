import React, { useState, useEffect } from "react";
import UserItem from "./userItem";
import "./userList.css";
import { getAllUsers } from "../../services/userService";

const UserLists = ({ user, history }) => {
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
        {users.map(u => (
          <UserItem
            key={users.indexOf(u)}
            user={u}
            currUser={user}
            history={history}
          />
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
