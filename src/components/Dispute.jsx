import React, { useState, useMemo, useRef, useEffect } from "react";
import SearchField from "./SearchField.jsx";
import DisputeChat from "./DisputeChat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const Dispute = function () {
  const [disputeMessages, setDisputeMessages] = useState([
    {
      date: new Date(),
      id: 0,
      name: "Participant0",
      text: "Text your arguments below",
    },
  ]);

  const sendDisputeMessage = (e, inputDisputMessage, theRef) => {
    e.preventDefault();
    if (inputDisputMessage) {
      let newDisputMessage = {
        date: new Date(),
        id: disputeMessages.length + 1,
        name: "participantName",
        text: inputDisputMessage,
      };
      setDisputeMessages([...disputeMessages, newDisputMessage]);
    }

    theRef.focus();
  };

  /*  ---------------------------------------- */
  // const [inputSearch, setInputSearch] = useState("");

  // const filterMessages = useMemo(() => {
  //   console.log("memo");
  //   return disputeMessages.filter((obj) =>
  //     obj.text.includes(inputSearch)
  //   );
  // }, [inputSearch, disputeMessages]);

  /*  ---------------------------------------- */

  const [showedMessages, setShowedMessages] = useState(disputeMessages);

  const searchMessages = (searchedMessages) => {
    setShowedMessages(searchedMessages);
  };

  const showMessages = useMemo(() => {
    return setShowedMessages(disputeMessages);
  }, [disputeMessages]);

  return (
    <div className="dispute">
      <SearchField
        disputeMessages={disputeMessages}
        searchMessages={searchMessages}
      />
      <DisputeChat messages={showedMessages} />
      <SendMessageForm sendFunc={sendDisputeMessage} />
    </div>
  );
};

export default Dispute;
