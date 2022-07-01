import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Likes from "../Likes.jsx";
import { setMessages } from "../../store/reducers/messagesSlice.js";
import { messagesAPI } from "../../api/api.js";

const MessageItem = (props) => {
  const dispatch = useDispatch();
  const messageId = props.message.id;
  // Name of state
  const flag = messageId.match(/[^_]*/g)[0];
  // Number in the id (need for find by index)
  const messageIndex = messageId.match(/\d+/g)[0];
  const isMessageDeleted = props.message.deleted;

  const asyncRequestToServer = function(type) {
    messagesAPI
      .deleteAndReturnOrLikeMessage(messageIndex, flag, type)
      .then((data) => {
        let fetchedMessages = [...data];
        dispatch(setMessages({ fetchedMessages, flag }));
      });
  };

  return (
    <div className="message-item" data-message-id={props.message.id}>
      <div className="message-name-and-text">
        <div className="message-name">{props.message.name}:&nbsp;</div>
        <div className="message-text">{props.message.text}</div>
      </div>
      {props.message.likes !== null && !isMessageDeleted ? (
        <Likes flag={flag} messageIndex={messageIndex} />
      ) : null}
      <div onClick={() => asyncRequestToServer("delete")}>DEL</div>
      <div onClick={() => asyncRequestToServer("return")}>Return</div>
      <div className="message-time">
        {props.message.dateHh}:{props.message.dateMm}
      </div>
    </div>
  );
};

export default MessageItem;
