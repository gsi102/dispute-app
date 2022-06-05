import React from "react";
import Chat from "./Chat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const Spectators = function(props) {
  console.log("render S");
  return (
    <div className="spectators">
      <Chat messages={props.specMessages} deleteFunc={props.deleteFunc} />
      <SendMessageForm sendFunc={props.sendMessage} flag={props.flag} />
    </div>
  );
};
export default Spectators;
