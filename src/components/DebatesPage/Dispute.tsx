import React from "react";
import SearchField from "../Chat/SearchField";
import Chat from "../Chat/Chat";
import SendMessageForm from "../Chat/SendMessageForm";
import { useAppSelector } from "../../hooks/hooks";

const Dispute: React.FC = function() {
  const flag = useAppSelector((state) => state.messages.flagSource.disputeChat);

  return (
    <div className="dispute">
      <SearchField flag={flag} />
      <p>Welcome to debates!</p>
      <Chat flag={flag} />
      <SendMessageForm flag={flag} />
    </div>
  );
};

export default Dispute;
