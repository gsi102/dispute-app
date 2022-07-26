import React from "react";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector } from "../../hooks/hooks";

const Spectators: React.FC<any> = function(props) {
  const flag = useAppSelector(
    (state) => state.messages.flagSource.spectatorChat
  );
  const disputeID = props.disputeID;
  // const disputeID = useAppSelector((state) => state.disputes.currentDispute);

  return (
    <div className="spectators">
      <div className="chatField">
        <p> Welcome to spec chat!</p>
        <Chat flag={flag} disputeID={disputeID} />
      </div>
      <SendMessageForm flag={flag} disputeID={disputeID} />
    </div>
  );
};
export default Spectators;
