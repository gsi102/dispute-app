import React, { useState, useMemo } from "react";
import SearchField from "./SearchField.jsx";
import Chat from "./Chat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const Dispute = function(props) {
  console.log("render D");
  // Search and display dispute messages
  const [searchInput, setSearchInput] = useState("");

  const filterMessages = useMemo(() => {
    searchInput.toString();
    return props.disputeMessages.filter((obj) =>
      obj.text.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput, props.disputeMessages]);

  const searchFunc = (newInputValue) => {
    setSearchInput(newInputValue);
  };

  return (
    <div className="dispute">
      <SearchField
        disputeMessages={props.disputeMessages}
        searchFunc={searchFunc}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Chat
        messages={filterMessages}
        flag={props.flag}
        deleteFunc={props.deleteFunc}
      />
      <SendMessageForm sendFunc={props.sendMessage} flag={props.flag} />
    </div>
  );
};

export default Dispute;
