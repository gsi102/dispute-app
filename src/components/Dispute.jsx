import React from "react";
import SearchField from "./SearchField.jsx";
import Chat from "./Chat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";
import { useSelector } from "react-redux";

const Dispute = function(props) {
  const flagD = useSelector((state) => state.messages.flagSource.disputeChat);

  return (
    <div className="dispute">
      <SearchField />
      <Chat flag={flagD} />
      <SendMessageForm flag={flagD} />
    </div>
  );
};

export default Dispute;
