import React, { useState } from "react";

// import classes from "./Input.module.css";

const Input = (props, inputRef) => {
  return <textarea ref={inputRef} {...props} />;
};

export default React.forwardRef(Input);
