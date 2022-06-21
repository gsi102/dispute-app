import React from "react";
import { useDispatch } from "react-redux";

import { deleteMessage } from "../../store/reducers/messagesSlice.js";
import Likes from "../Likes.jsx";

const MessageItem = (props) => {
  const dispatch = useDispatch();
  const messageId = props.message.id;
  const isMessageDeleted = props.message.deleted;

  return (
    <div className="message-item" data-message-id={props.message.id}>
      <div className="message-name-and-text">
        <div className="message-name">{props.message.name}:&nbsp;</div>
        <div className="message-text">{props.message.text}</div>
      </div>
      {props.message.likes >= 0 && !isMessageDeleted ? (
        <Likes messageId={messageId} />
      ) : null}
      <div onClick={() => dispatch(deleteMessage({ messageId }))}>DEL</div>
      <div className="message-time">
        {props.message.dateHh}:{props.message.dateMm}
      </div>
    </div>
  );
};

export default MessageItem;
