import React from "react";
import "./input.style.css";

const Input = ({placeholder, errors, ...rest}) => {  
  const name = placeholder.toLowerCase();

  return (
    <div id="input-group">
      <input
        id="input"
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      <div id="input-schema">{errors}</div>
    </div>
  );
};

export default Input;
