import React, { useRef, useState } from "react";
import MessageInput from "./UI/inputs/MessageInput.jsx";
import MessageButton from "./UI/buttons/MessageButton.jsx";

const SendMessageForm = function (props) {
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef(null);

  const funcQueue = (e) => {
    props.sendFunc(e, inputMessage, inputRef.current);
    setInputMessage("");
  };

  const sendOnKey = (e) => {
    if (e.key === "Enter") {
      funcQueue(e);
    }
  };

  return (
    <div className="dispute-chat-form">
      <MessageInput
        value={inputMessage}
        ref={inputRef}
        className="input-chat-message"
        type="text"
        placeholder="your text"
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={sendOnKey}
      />
      <MessageButton className="send-message-btn" onClick={funcQueue} />
    </div>
  );
};

export default SendMessageForm;
