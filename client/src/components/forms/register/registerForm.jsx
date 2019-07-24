import React from "react";
import { postUser, checkUsername } from "../../../services/userService";
import CryptoJS from "crypto-js";
import cryptico from "cryptico";
import validate from "./validateRegisterForm";
import UserForm from "../userForm";
import Card from "../../card";
const { SHA256 } = CryptoJS;

const RegisterForm = ({ history }) => {
  async function handleSubmit(username, password) {
    function createAccount() {
      const auth = SHA256(username + password).toString();
      const passPhrase = SHA256(auth + password).toString();
      const privateKey = cryptico.generateRSAKey(passPhrase, 1024);
      const publicKey = cryptico.publicKeyString(privateKey);

      return { username, auth, publicKey };
    }

    const isExisting = await checkUsername(username);
    if (isExisting) return alert("User with the username already exists");

    const account = createAccount();

    try {
      await postUser(account);
      alert("Account has been created.");
      history.push("/login");
    } catch (err) {
      alert("Error: ", err.message);
    }
  }

  return (
    <Card>
      <UserForm label="Register" onSubmit={handleSubmit} validate={validate} />
      <a href="/login">Already have an account?</a>
    </Card>
  );
};

export default RegisterForm;
