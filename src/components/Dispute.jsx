import React, { useState, useMemo } from "react";
import SearchField from "./SearchField.jsx";
import Chat from "./Chat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const Dispute = function (props) {
  // Search and display specific dispute messages
  const [inputValue, setInputValue] = useState("");

  const filterMessages = useMemo(() => {
    return props.disputeMessages.filter((obj) => obj.text.includes(inputValue));
  }, [inputValue, props.disputeMessages]);

  const searchFunc = (newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <div className="dispute">
      <SearchField
        disputeMessages={props.disputeMessages}
        searchFunc={searchFunc}
      />
      <Chat messages={filterMessages} />
      <SendMessageForm sendFunc={props.sendMessage} flag={props.flag} />
    </div>
  );
};

export default Dispute;
