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

  const userLogin = useSelector((state) => state.users.userData.login);
  const userID = useSelector((state) => state.users.userData.id);

  const sendMessage = () => {
    messagesAPI
      .newMessage(flag, userID, userLogin, messageInput)
      .then((data) => {
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
