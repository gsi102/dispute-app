import React, { useRef, useState } from "react";
import MessageInput from "../UI/inputs/MessageInput.jsx";
import MessageButton from "../UI/buttons/MessageButton.jsx";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/reducers/messagesSlice.js";

const SendMessageForm = function(props) {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const flag = props.flag;

  const funcQueue = (e) => {
    console.log();
    e.preventDefault(); //remove when button will change to div
    const isInputMessage = messageInput.replace(/\s+/g, "");
    isInputMessage
      ? dispatch(sendMessage({ messageInput, flag }))
      : alert("Your message is empty!"); //change from alert
    inputRef.current.focus();
    setMessageInput("");
  };

  return (
    <div className="dispute-chat-form">
      <MessageInput
        value={messageInput}
        ref={inputRef}
        className="input-chat-message"
        type="text"
        placeholder="your text"
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? funcQueue(e) : null)}
      />
      <MessageButton className="send-message-btn" onClick={funcQueue} />
    </div>
  );
};

export default SendMessageForm;
