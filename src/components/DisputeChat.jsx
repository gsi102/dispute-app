import React, { useState, useMemo } from "react";
import MessageItem from "./MessageItem.jsx";
import SearchField from "./SearchField.jsx";

const DisputeChat = (props) => {
  return (
    <div className="dispute-chat">
      {props.messages.map((message) => (
        <MessageItem dispMessage={message} key={message.id} />
      ))}
    </div>
  );
};

export default DisputeChat;
