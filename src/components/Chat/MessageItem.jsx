import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../store/reducers/messagesSlice.js";
import Likes from "../Likes.jsx";
import { setMessages } from "../../store/reducers/messagesSlice.js";

const MessageItem = (props) => {
  const dispatch = useDispatch();
  const messageId = props.message.id;
  // Name of state
  const flag = messageId.match(/[^_]*/g)[0];
  // Number in the id (need for find by index)
  const messageIndex = messageId.match(/\d+/g)[0];

  const isMessageDeleted = props.message.deleted;
  //Working w/ server
  const serverName = useSelector((state) => state.messages.serverName);
  let patchTarget = flag.match(/^(.*?)Messages/);
  patchTarget = patchTarget[1].toUpperCase();

  const asyncRequestToServer = function(type) {
    axios
      .patch(`${serverName}/messages/${patchTarget}/${messageIndex}`, {
        type: type,
      })
      .then((response) => {
        let fetchedMessages = [...response.data];
        dispatch(setMessages({ fetchedMessages, flag }));
      });
  };

  const funcQueue = function() {
    // dispatch(deleteMessage({ messageIndex }));
  };

  return (
    <div className="message-item" data-message-id={props.message.id}>
      <div className="message-name-and-text">
        <div className="message-name">{props.message.name}:&nbsp;</div>
        <div className="message-text">{props.message.text}</div>
      </div>
      {props.message.likes >= 0 && !isMessageDeleted ? (
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
