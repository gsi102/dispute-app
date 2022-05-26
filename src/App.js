import React, { useState } from "react";
import Participants from "./components/Participants.jsx";
import Dispute from "./components/Dispute.jsx";
import Spectators from "./components/Spectators.jsx";

import "./styles/App.css";

function App() {
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
    <div className="App">
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
}

export default App;
