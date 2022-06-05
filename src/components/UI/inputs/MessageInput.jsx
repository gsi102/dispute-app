import React from "react";
// import classes from "./MessageInput.module.css";

const MessageInput = React.forwardRef((props, inputRef) => {
  return <textarea ref={inputRef} {...props} />;
});

export default MessageInput;
