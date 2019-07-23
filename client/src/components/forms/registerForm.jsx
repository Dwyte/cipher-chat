import React from "react";
import { postUser, checkUsername } from "../../services/userService";
import CryptoJS from "crypto-js";
import cryptico from "cryptico";
import Input from "./input/input";
import Button from "./button/button";
import useForm from "./useForm";
import validate from "./validateRegisterForm";
const { SHA256 } = CryptoJS;

const RegisterForm = ({ history }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  );

  const { username, password } = values;

  async function doSubmit() {
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

  function createAccount() {
    const auth = SHA256(username + password).toString();
    const passPhrase = SHA256(auth + password).toString();
    const privateKey = cryptico.generateRSAKey(passPhrase, 1024);
    const publicKey = cryptico.publicKeyString(privateKey);

    return { username, auth, publicKey };
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
          maxLength="24"
        />
        <Input
          type="password"
          placeholder="Password"
          errors={errors.password}
          value={password || ""}
          onChange={handleChange}
          maxLength="36"
        />
        <Button label="Register" />
        
        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
};

export default RegisterForm;
