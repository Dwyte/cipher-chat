import React from "react";
import { authUser, checkUsername } from "../../services/userService";
import CryptoJS from "crypto-js";
import Input from "./input/input";
import Button from "./button/button";
import useForm from "./useForm";
import validate from "./validateLoginForm";
const { SHA256 } = CryptoJS;

const LoginForm = ({ history }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  );

  const { username, password } = values;

  async function doSubmit() {
    const isExisting = await checkUsername(username);
    if (!isExisting) return alert("User with the username not found.");

    const auth = SHA256(username + password).toString();

    try {
      const { data: userToken } = await authUser({ auth });

      saveLoginToken(auth, userToken);

      alert("Account authenticated!");

      history.push("/chat");
    } catch (err) {
      alert("Authentication Failed: Wrong Credentials");
      localStorage.clear();
    }
  }

  function saveLoginToken(auth, userToken) {
    const passPhrase = SHA256(auth + password).toString();
    localStorage.setItem("pvk_phrase", passPhrase);
    localStorage.setItem("userToken", userToken);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          errors={errors.username}
          value={username || ""}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          errors={errors.password}
          value={password || ""}
          onChange={handleChange}
        />
        <Button label="Login" />

        <a href="/register">Don't have an account yet?</a>
      </form>
    </div>
  );
};

export default LoginForm;
