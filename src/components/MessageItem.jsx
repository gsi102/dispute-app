import React from "react";
import Likes from "./Likes.jsx";

const MessageItem = (props) => {
  return (
    <div className="message-item" data-message-id={props.dispMessage.id}>
      <div className="message-name-and-text">
        {props.dispMessage.name}:{" "}
        <div className="message-text">{props.dispMessage.text}</div>
        &nbsp;
      </div>
      {props.flag === "d" && <Likes />}
      <div onClick={props.deleteFunc}>DEL</div>
      <div className="message-time">
        {props.dispMessage.date.getHours()}:
        {(props.dispMessage.date.getMinutes() < 10 ? "0" : "") +
          props.dispMessage.date.getMinutes()}
      </div>
    </div>
  );
};

export default MessageItem;
