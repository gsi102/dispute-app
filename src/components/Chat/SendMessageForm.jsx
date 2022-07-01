import React, { useRef, useState } from "react";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../store/reducers/messagesSlice.js";
import { messagesAPI } from "../../api/api.js";

const SendMessageForm = function(props) {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const flag = props.flag;
  const currentState = useSelector((state) => state.messages[flag]);
  const postfixForId = currentState.length;

  const sendMessage = () => {
    messagesAPI.newMessage(flag, messageInput, postfixForId).then((data) => {
      let fetchedMessages = [...data];
      dispatch(setMessages({ fetchedMessages, flag }));
    });
  };

  const funcQueue = () => {
    const isInputMessage = messageInput.replace(/\s+/g, "");
    if (isInputMessage) sendMessage();
    inputRef.current.focus();
    setMessageInput("");
  };

  return (
    <div className="dispute-chat-form">
      <Input
        value={messageInput}
        ref={inputRef}
        className="input-chat-message"
        type="text"
        placeholder="your text"
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? funcQueue() : "")}
      />
      <Button className="send-message-btn" onClick={funcQueue}>
        Send
      </Button>
    </div>
  );
};

export default SendMessageForm;
