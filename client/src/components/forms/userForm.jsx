import React, { useState } from "react";
import InputForm from "./inputForm";
import Button from "./button";
import useForm from "./useForm";

const UserForm = ({ label, onSubmit, validate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  );

  const { username, password } = values;

  function doSubmit() {
    setIsLoading(true);

    const onSubmitCallback = () => setIsLoading(false);

    onSubmit(username, password, onSubmitCallback);
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
        autoFocus
        disabled={isLoading}
      />
      <InputForm
        type="password"
        placeholder="Password"
        errors={errors.password}
        value={password || ""}
        onChange={handleChange}
        maxLength="36"
        disabled={isLoading}
      />
      <Button disabled={isLoading}>
        <b>{isLoading ? "..." : label}</b>
      </Button>
    </form>
  );
};

export default UserForm;
