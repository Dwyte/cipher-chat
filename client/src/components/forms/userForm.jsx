import React from "react";
import InputForm from "./inputForm";
import Button from "./button";
import useForm from "./useForm";

const UserForm = ({ label, onSubmit, validate }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  );

  const { username, password } = values;

  function doSubmit() {
    onSubmit(username, password);
  }

  function checkCurrentUser() {
    const aUserIsLoggedIn =
      localStorage.getItem("pvk_phrase") && localStorage.getItem("userToken");

    return Boolean(aUserIsLoggedIn);
  }

  return (
    <form onSubmit={handleSubmit}>
      {checkCurrentUser() ? (window.location = "/chat") : ""}

      <InputForm
        type="text"
        placeholder="Username"
        errors={errors.username}
        value={username || ""}
        onChange={handleChange}
        maxLength="24"
      />
      <InputForm
        type="password"
        placeholder="Password"
        errors={errors.password}
        value={password || ""}
        onChange={handleChange}
        maxLength="36"
      />
      <Button label={label} />
    </form>
  );
};

export default UserForm;
