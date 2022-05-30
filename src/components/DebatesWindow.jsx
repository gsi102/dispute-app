import React, { useState } from "react";
import Participants from "./Participants.jsx";
import Dispute from "./Dispute.jsx";
import Spectators from "./Spectators.jsx";

const DebatesWindow = () => {
  const [disputeMessages, setDisputeMessages] = useState([
    {
      date: new Date(),
      id: 0,
      name: "Participant0",
      text: "Text your arguments below",
    },
  ]);

  const [specMessages, setSpecMessages] = useState([
    {
      date: new Date(),
      id: 1,
      name: "Admin",
      text: "Welcome to spec chat!",
    },
  ]);

  // Source for message id
  const flagSource = {
    disputeChat: "dispute",
    spectatorChat: "spectator",
  };

  // Send message function after click on the button
  const sendMessage = (e, inputMessage, theRef, flag) => {
    e.preventDefault();
    inputMessage.toString();

    if (inputMessage) {
      let newMessage = {
        date: new Date(),
        id: 0,
        name: "someName",
        text: inputMessage,
      };

      if (flag === "dispute") {
        setDisputeMessages([...disputeMessages, newMessage]);
        newMessage.id = flag + "_messageId_" + disputeMessages.length;
      } else {
        setSpecMessages([...specMessages, newMessage]);
        newMessage.id = flag + "_messageId_" + specMessages.length;
      }
    }

    theRef.focus();
  };

  return (
    <div className="debates-window">
      <Participants />
      <Dispute
        disputeMessages={disputeMessages}
        sendMessage={sendMessage}
        flag={flagSource.disputeChat}
      />
      <Spectators
        specMessages={specMessages}
        sendMessage={sendMessage}
        flag={flagSource.spectatorChat}
      />
    </div>
  );
};

export default DebatesWindow;
