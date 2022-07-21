import React from "react";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector } from "../../hooks/hooks";

const Spectators: React.FC = function() {
  const flag = useAppSelector(
    (state) => state.messages.flagSource.spectatorChat
  );

  return (
    <div className="spectators">
      <div className="chatField">
        <p> Welcome to spec chat!</p>
        <Chat flag={flag} />
      </div>
      <SendMessageForm flag={flag} />
    </div>
  );
};
export default Spectators;
