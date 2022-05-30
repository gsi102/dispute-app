import React from "react";
import Likes from "./Likes.jsx";

const MessageItem = (props) => {
  return (
    <div>
      {props.dispMessage.name}: {props.dispMessage.text}&nbsp;
      {props.flag === "dispute" && <Likes />}
      <div>
        {props.dispMessage.date.getHours()}:
        {(props.dispMessage.date.getMinutes() < 10 ? "0" : "") +
          props.dispMessage.date.getMinutes()}
      </div>
    </div>
  );
};

export default MessageItem;
