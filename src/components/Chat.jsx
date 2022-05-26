import React from "react";
import MessageItem from "./MessageItem.jsx";

const SpectatorChat = (props) => {
  return (
    <div className="chat">
      {props.messages.map((message) => (
        <MessageItem dispMessage={message} key={message.id} />
      ))}
    </div>
  );
};

export default SpectatorChat;
