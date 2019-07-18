import React, { useState } from "react";
import { postUser, checkUsername } from "../services/userService";
import CryptoJS from "crypto-js";
import cryptico from "cryptico";
const { SHA256 } = CryptoJS;

const Register = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const isExisting = await checkUsername(username);
    if (isExisting) return alert("User with the username already exists");

    const auth = SHA256(username + password).toString();
    const passPhrase = SHA256(auth + password).toString();
    const privateKey = cryptico.generateRSAKey(passPhrase, 1024);
    const publicKey = cryptico.publicKeyString(privateKey);

    try {
      await postUser({ username, auth, publicKey });
      alert("Account has been created.");
      history.push("/login");
    } catch (err) {
      alert("Error: ", err);
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
          pattern=".{2,12}"
          maxLength="12"
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

        <input className="btn-dark" type="submit" value="Register" />

        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default Register;
