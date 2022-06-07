import React from "react";
import { useDispatch } from "react-redux";
import Likes from "./Likes.jsx";

import { deleteMessage } from "../store/reducers/messagesSlice.js";

const MessageItem = (props) => {
  const dispatch = useDispatch();

  const funcQueue = function(e) {
    const messageId = e.target.parentNode.getAttribute("data-message-id");
    dispatch(deleteMessage({ messageId }));
  };

  return (
    <div className="message-item" data-message-id={props.message.id}>
      <div className="message-name-and-text">
        <div className="message-name">{props.message.name}:&nbsp;</div>
        <div className="message-text">{props.message.text}</div>
      </div>
      {props.flag === "d" && <Likes />}
      <div onClick={funcQueue}>DEL</div>
      <div className="message-time">
        {props.message.dateHh}:{props.message.dateMm}
      </div>
    </div>
  );
};

export default MessageItem;
