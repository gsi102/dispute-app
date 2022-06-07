import React, { useRef, useState } from "react";
import MessageInput from "./UI/inputs/MessageInput.jsx";
import MessageButton from "./UI/buttons/MessageButton.jsx";
import { useDispatch } from "react-redux";
import { sendMessage } from "../store/reducers/messagesSlice.js";

const SendMessageForm = function(props) {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const flag = props.flag;

  const funcQueue = (e) => {
    e.preventDefault(); //remove when button changes to div
    dispatch(sendMessage({ messageInput, flag }));
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
