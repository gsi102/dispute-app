import React, { useState } from "react";
import SpectatorChat from "./SpectatorChat.jsx";
import SendMessageForm from "./SendMessageForm.jsx";

const Spectators = function () {
  const [specMessages, setSpecMessages] = useState([
    {
      date: new Date(),
      id: 0,
      name: "Admin",
      text: "Welcome to spec chat!",
    },
  ]);

  const sendSpecMessage = (e, inputSpecMessage, theRef) => {
    e.preventDefault();

    if (inputSpecMessage) {
      let newSpecMessage = {
        date: new Date(),
        id: specMessages.length + 1,
        name: "specName",
        text: inputSpecMessage,
      };
      setSpecMessages([...specMessages, newSpecMessage]);
    }

    theRef.focus();
  };

  return (
    <div className="spectators">
      <SpectatorChat messages={specMessages} />
      <SendMessageForm sendFunc={sendSpecMessage} />
    </div>
  );
};
export default Spectators;
