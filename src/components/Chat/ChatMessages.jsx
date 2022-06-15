import React from "react";
import MessageItem from "./MessageItem.jsx";

const ChatMessages = function ({ props }) {
  return (
    <div className="chat-messages">
      {props.map((message) => (
        <MessageItem messages={message} key={message.id} />
      ))}
    </div>
  );
};

export default ChatMessages;
