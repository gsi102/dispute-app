import React, { useRef, useState } from "react";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../store/reducers/messagesSlice.js";
import axios from "axios";
import { setMessages } from "../../store/reducers/messagesSlice.js";

const SendMessageForm = function(props) {
  const [messageInput, setMessageInput] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const flag = props.flag;

  // working with server
  const currentState = useSelector((state) => state.messages[flag]);
  const serverName = useSelector((state) => state.messages.serverName);

  const sendMessage = (messageInput) => {
    const newMessageFactory = function() {
      const date = new Date();
      function dateTransform(dateValue) {
        return ((dateValue < 10 ? "0" : "") + dateValue).toString();
      }

      let newMessage = {
        dateHh: dateTransform(date.getHours()),
        dateMm: dateTransform(date.getMinutes()),
        dateFull: date.toString(),
        id: "",
        name: "someName",
        text: messageInput,
        deletedText: "",
        deleted: false,
      };

      // Setting likes only for disputeMessages
      if (flag.search(/^[d]/) === 0) newMessage.likes = 0;
      // Setting correct id
      newMessage.id = flag + "_" + currentState.length;
      return newMessage;
    };
    // working with server
    let pushTarget = flag.match(/^(.*?)Messages/);
    pushTarget = pushTarget[1].toUpperCase();
    axios
      .post(`${serverName}/messages/${pushTarget}`, newMessageFactory())
      .then((response) => {
        let fetchedMessages = [...response.data];
        dispatch(setMessages({ fetchedMessages, flag }));
      });
  };

  const funcQueue = () => {
    const isInputMessage = messageInput.replace(/\s+/g, "");
    if (isInputMessage) sendMessage(messageInput);
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
