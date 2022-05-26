import React, { useState } from "react";
import Chat from "./Chat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const Spectators = function (props) {
  const flagSpectators = "spectators";

  return (
    <div className="spectators">
      <Chat messages={props.specMessages} />
      <SendMessageForm sendFunc={props.sendMessage} flag={props.flag} />
    </div>
  );
};
export default Spectators;
