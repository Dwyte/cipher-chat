import React, { useState } from "react";
import { postUser, getUser } from "../services/userService";
import CryptoJS from "crypto-js";
const { SHA256 } = CryptoJS;

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const isExisting = await getUser(username);
    if (isExisting) return alert("User with the username already exists");

    const auth = SHA256(username + password).toString();

    try {
      await postUser({ username, auth });
      alert("Account has been created.")
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          className="mb"
          type="text"
          placeholder="Pseudoname"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          className="mb"
          type="password"
          placeholder="Secret Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <input className="btn-dark" type="submit" value="Register" />

        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default Register;
