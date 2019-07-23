export default function validate(values) {
  let errors = {};

  if (!values.username) errors.username = "* Username is required";
  else if (!/\S{2,24}/.test(values.username))
    errors.username = "* Username must have 2-24 characters. (No Spaces)";

  if (!values.password) errors.password = "* Password is required";
  else if (
    !/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/.test(
      values.password
    )
  )
    errors.password =
      "* Must be atleast 8 characters and contains atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";


  console.log(errors);
  return errors;
}
