import React from "react";
import Chat from "./Chat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";
import { useSelector } from "react-redux";

const Spectators = function() {
  const flagS = useSelector((state) => state.messages.flagSource.spectatorChat);

  return (
    <div className="spectators">
      <Chat flag={flagS} />
      <SendMessageForm flag={flagS} />
    </div>
  );
};
export default Spectators;
