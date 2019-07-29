import React from "react";
import InputForm from "./inputForm";
import Button from "./button";
import useForm from "./useForm";
import styled from "styled-components";

const Form = styled.form``;

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
    <Form onSubmit={handleSubmit}>
      {checkCurrentUser() ? (window.location = "/chat") : ""}

      <InputForm
        type="text"
        placeholder="Username"
        errors={errors.username}
        value={username || ""}
        onChange={handleChange}
        maxLength="24"
        autoFocus
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
    </Form>
  );
};

export default UserForm;
