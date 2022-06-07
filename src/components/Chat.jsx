import React from "react";
import MessageItem from "./MessageItem.jsx";

import { useSelector } from "react-redux";

const Chat = (props) => {
  let messages = {};

  props.flag === "d"
    ? (messages = useSelector((state) => state.messages.showDisputeMessages))
    : (messages = useSelector((state) => state.messages.specMessages));

  return (
    <div className="chat">
      {messages.map((message) => (
        <MessageItem message={message} flag={props.flag} key={message.id} />
      ))}
    </div>
  );
};

export default Chat;
