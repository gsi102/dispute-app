import React, { useRef, useState } from "react";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import { useDispatch, useSelector } from "react-redux";

import { sendMessageThunk } from "../../store/reducers/messagesSlice";

const SendMessageForm = function(props) {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const flag = props.flag;
  const userLogin = useSelector((state) => state.users.userData.login);
  const userID = useSelector((state) => state.users.userData.id);

  const sendMessage = async () => {
    try {
      const response = await dispatch(
        sendMessageThunk({ flag, userID, userLogin, messageInput })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
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
