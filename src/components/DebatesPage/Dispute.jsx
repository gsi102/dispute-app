import React from "react";
import SearchField from "../Chat/SearchField.jsx";
import Chat from "../Chat/Chat.jsx";
import SendMessageForm from "../Chat/SendMessageForm.jsx";
import { useSelector } from "react-redux";

const Dispute = function() {
  const flag = useSelector((state) => state.messages.flagSource.disputeChat);

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
