import React from "react";
import MessageItem from "./MessageItem.jsx";

const SpectatorChat = (props) => {
  return (
    <div className="chat">
      {props.messages.map((message) => (
        <MessageItem
          deleteFunc={props.deleteFunc}
          dispMessage={message}
          flag={props.flag}
          key={message.id}
        />
      ))}
    </div>
  );
};

export default SpectatorChat;
