import React from "react";
import {
  postUser,
  checkUsername,
  updateUser
} from "../../../services/userService";
import CryptoJS from "crypto-js";
import validate from "./validateRegisterForm";
import UserForm from "../userForm";
import Card from "../../card";
import Title from "../title";
import pbkdf2 from "pbkdf2";
import crypto from "crypto";

const RegisterForm = ({ history }) => {
  async function handleSubmit(username, password, callback) {
    try {
      const isExisting = await checkUsername(username);
      if (isExisting) {
        callback();
        return alert("User with the username already exists");
      }
      const auth = pbkdf2
        .pbkdf2Sync(password, username, 25000, 64, "sha512")
        .toString("hex");

      const { data: user } = await postUser({ username, auth });

      const { _id, auth: _auth, salt } = user;

      const ecdh = crypto.createECDH("secp521r1");
      const passphrase = pbkdf2
        .pbkdf2Sync(_auth + password, salt, 25000, 64, "sha512")
        .toString("hex");

      const publicKey = JSON.stringify(ecdh.generateKeys());
      const pbkHash = CryptoJS.SHA256(publicKey).toString();
      const privateKey = ecdh.getPrivateKey();
      const privateKeyCipher = CryptoJS.AES.encrypt(
        JSON.stringify(privateKey),
        passphrase
      ).toString();

      const { data: _user } = await updateUser(_id, {
        username,
        privateKeyCipher,
        publicKey,
        pbkHash
      });

      console.log(_user);

      alert("Account has been created.");
      history.push("/login");
    } catch (err) {
      console.log(err);
      callback();
      alert("Error: ", err.message);
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
        <UserForm label="Sign-up" onSubmit={handleSubmit} validate={validate} />
        <a href="/login">Already have an account?</a>
      </Card>
    </React.Fragment>
  );
};

export default RegisterForm;
