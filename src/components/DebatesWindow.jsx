import React, { useState } from "react";
import Participants from "./Participants.jsx";
import Dispute from "./Dispute.jsx";
import Spectators from "./Spectators.jsx";

const DebatesWindow = () => {
  // Leave empty obj, it's just an example
  const [disputeMessages, setDisputeMessages] = useState([
    {
      date: new Date(),
      id: "d_messageId_0",
      name: "Participant0",
      text: "Text your arguments below",
    },
  ]);

  const [specMessages, setSpecMessages] = useState([
    {
      date: new Date(),
      id: "s_messageId_0",
      name: "Admin",
      text: "Welcome to spec chat!",
    },
  ]);

  /* Source for message id. Very important! Used in functions: sendMessage, deleteMessage */
  const flagSource = {
    disputeChat: "d",
    spectatorChat: "s",
  };

  // Send message function after click on the button
  const sendMessage = (e, inputMessage, inputRef, flag) => {
    e.preventDefault();
    inputMessage.toString();
    let isInputMessage = inputMessage.replace(/\s+/g, "");

    if (isInputMessage) {
      let newMessage = {
        date: new Date(),
        id: "",
        name: "someName",
        text: inputMessage,
      };

      if (flag === "d") {
        setDisputeMessages([...disputeMessages, newMessage]);
        newMessage.id = flag + "_messageId_" + disputeMessages.length;
      } else {
        setSpecMessages([...specMessages, newMessage]);
        newMessage.id = flag + "_messageId_" + specMessages.length;
      }
    } else {
      alert("Your message is empty!");
    }

    inputRef.focus();
  };

  // Delete message function after clicking on the button by admin/moderator
  const deleteMessage = function(e) {
    // Getting the first sign as a source and the digits as an index
    let deletedId = e.target.parentNode.getAttribute("data-message-id");
    let flag = deletedId.match(/[^]/);
    console.log(flag);
    deletedId = Number(deletedId.match(/\d+/g));
    // Using temporary state to change only one message. Not a good decision.
    let temp_state = flag[0] === "s" ? [...specMessages] : [...disputeMessages];
    let temp_element = { ...temp_state[deletedId] };
    Object.assign(temp_element, {
      textDeleted: temp_element.text,
      text: "Message has been deleted by moderator",
    });
    temp_state[deletedId] = temp_element;
    flag[0] === "s"
      ? setSpecMessages(temp_state)
      : setDisputeMessages(temp_state);
  };

  return (
    <div className="debates-window">
      <Participants />
      <Dispute
        disputeMessages={disputeMessages}
        sendMessage={sendMessage}
        flag={flagSource.disputeChat}
        deleteFunc={deleteMessage}
      />
      <Spectators
        specMessages={specMessages}
        sendMessage={sendMessage}
        flag={flagSource.spectatorChat}
        deleteFunc={deleteMessage}
      />
    </div>
  );
};

export default DebatesWindow;
