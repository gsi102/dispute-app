import React from "react";

const Button = function(props) {
  return <button {...props}>{props.children}</button>;
};

export default Button;
