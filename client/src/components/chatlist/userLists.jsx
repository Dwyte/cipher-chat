import React, { useState, useEffect } from "react";
import UserItem from "./userItem";
import "./userList.css";
import { getAllUsers } from "../../services/userService";

const UserLists = ({ user, history, setChannel, setPrivChannel }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const { data: users } = await getAllUsers();

      setUsers(users);
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter(
    u => u.username.match(new RegExp(search + ".*", "i"))
  );

  return (
    <React.Fragment>
      <div className="list mb">
        {filteredUsers.map(u => (
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
        onChange={({ target }) => setSearch(target.value)}
        placeholder="Search for someone to chat..."
      />
    </React.Fragment>
  );
};

export default UserLists;
