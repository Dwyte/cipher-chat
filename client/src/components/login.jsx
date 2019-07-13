import React, { useState } from "react";
import { authUser, checkUsername } from "../services/userService";
import CryptoJS from "crypto-js";
const { SHA256 } = CryptoJS;

const Login = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const isExisting = await checkUsername(username);
    if (!isExisting) return alert("User with the username not found.");

    const auth = SHA256(username + password).toString();
    const passPhrase = SHA256(auth + password).toString();
    localStorage.setItem("pvk_phrase", passPhrase);

    try {
      const { data: userToken } = await authUser({ auth });
      localStorage.setItem("userToken", userToken);

      alert("Account authenticated!");
      history.push("/chat");
    } catch (err) {
      console.log(err);
      localStorage.clear();
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
          pattern=".{2,}"
          required
          title="2 characters or more"
        />
        <input
          className="mb"
          type="password"
          placeholder="Secret Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          pattern=".{8,}"
          required
          title="must be atleast 8 characters"
        />
        <input className="btn-dark" type="submit" value="Login" />

        <a href="/register">Don't have an account yet?</a>
      </form>
    </div>
  );
};

export default Login;
