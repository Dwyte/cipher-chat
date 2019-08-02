import React from "react";
import { authUser, checkUsername } from "../../../services/userService";
import CryptoJS from "crypto-js";
import validate from "./validateLoginForm";
import UserForm from "../userForm";
import Card from "../../card";
import Title from "../title";
import pbkdf2 from "pbkdf2";

const LoginForm = ({ history }) => {
  async function handleSubmit(username, password, callback) {
    try {
      const isExisting = await checkUsername(username);
      if (!isExisting) {
        callback();
        return alert("User with the username not found.");
      }

      const auth = pbkdf2
        .pbkdf2Sync(password, username, 25000, 64, "sha512")
        .toString("hex");

      const { userToken, user } = await authUser({ username, auth });
      const { auth: _auth, privateKeyCipher, salt, publicKey } = user;
      const passphrase = pbkdf2
        .pbkdf2Sync(_auth + password, salt, 25000, 64, "sha512")
        .toString("hex");

      const privateKeyStr = CryptoJS.AES.decrypt(
        privateKeyCipher,
        passphrase
      ).toString(CryptoJS.enc.Utf8);

      localStorage.setItem("userToken", userToken);
      localStorage.setItem("pvk", privateKeyStr);
      localStorage.setItem("pbk", publicKey);


      alert("Account authenticated!");

      history.push("/chat");
    } catch (err) {
      callback();
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
