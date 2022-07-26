import React, { useRef, useState } from "react";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sendMessageThunk } from "../../store/reducers/messagesSliceThunk";
import { FlagAsProps } from "../../types/types";

const SendMessageForm: React.FC<any> = function(props) {
  const { flag, disputeID } = props;
  const [messageInput, setMessageInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.users.userData.login);
  const userID = useAppSelector((state) => state.users.userData.id);
  const wsReadyStatus = useAppSelector((state) => state.messages.wsReadyStatus);

  const sendMessage = async (): Promise<void> => {
    try {
      const fetchTarget = flag + "_" + disputeID;
      const response = await dispatch(
        sendMessageThunk({ fetchTarget, userID, userLogin, messageInput })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const funcQueue = (): void => {
    const isInputMessage = messageInput.replace(/\s+/g, "");
    if (isInputMessage) sendMessage();
    // "If" for TS:
    if (inputRef && inputRef.current) inputRef.current.focus();
    setMessageInput("");
  };

  return (
    <div className="sendMessageForm">
      <span className="userLogin">{userLogin}:</span>
      <Input
        value={messageInput}
        ref={inputRef}
        className="input-chat-message"
        type="text"
        placeholder="your text"
        onChange={(e: any) => setMessageInput(e.target.value)}
        onKeyDown={(e: any) => (e.key === "Enter" ? funcQueue() : "")}
      />
      <Button
        className="send-message-btn"
        disabled={wsReadyStatus !== "ready"}
        onClick={funcQueue}
      >
        Send
      </Button>
    </div>
  );
};

export default SendMessageForm;
