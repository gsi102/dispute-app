import React, { useState } from "react";

// import classes from "./Input.module.css";

const Input = (props, inputRef) => {
  return <input ref={inputRef} {...props} />;
};

export default React.forwardRef(Input);
