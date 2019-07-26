import React from "react";
import { authUser, checkUsername } from "../../../services/userService";
import CryptoJS from "crypto-js";
import validate from "./validateLoginForm";
import UserForm from "../userForm";
import Card from "../../card";
import Title from "../title";
const { SHA256 } = CryptoJS;

const LoginForm = ({ history }) => {
  async function handleSubmit(username, password) {
    const isExisting = await checkUsername(username);
    if (!isExisting) return alert("User with the username not found.");

    const auth = SHA256(username + password).toString();

    try {
      const { data: userToken } = await authUser({ auth });

      const passPhrase = SHA256(auth + password).toString();
      localStorage.setItem("pvk_phrase", passPhrase);
      localStorage.setItem("userToken", userToken);

      alert("Account authenticated!");

      history.push("/chat");
    } catch (err) {
      alert("Authentication Failed: Wrong Credentials");
      localStorage.clear();
    }
  }

  return (
    <React.Fragment>
      <Title
        title={"CipherChat"}
        body={
          <React.Fragment>
            An End-to-End Encrypted Instant Messaging App <br />
            Chat secretly and securely on the web.
          </React.Fragment>
        }
      />

      <Card>
        <UserForm label="Sign-in" onSubmit={handleSubmit} validate={validate} />
        <a href="/register">Don't have an account yet?</a>
      </Card>
    </React.Fragment>
  );
};

export default LoginForm;
