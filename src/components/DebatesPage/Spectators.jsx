import React from "react";
import Chat from "../Chat/Chat.jsx";
import SendMessageForm from "../Chat/SendMessageForm.jsx";
import { useSelector } from "react-redux";

const Spectators = function() {
  const flag = useSelector((state) => state.messages._flagSource.spectatorChat);

  return (
    <div className="spectators">
      <p> Welcome to spec chat!</p>
      <Chat flag={flag} />
      <SendMessageForm flag={flag} />
    </div>
  );
};
export default Spectators;
