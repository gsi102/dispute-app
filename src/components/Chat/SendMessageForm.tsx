import React, { useRef, useState } from "react";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sendMessageThunk } from "../../store/reducers/messagesSliceThunk";
import { FlagAsProps } from "../../types/types";

import styles from "../../styles/App.module.css";

const SendMessageForm: React.FC<any> = function(props) {
  const { flag, disputeID } = props;
  const [messageInput, setMessageInput] = useState<string>("");
  const isLoading = useAppSelector(
    (state: any) => state.messages.isLoading[flag]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.users.userData.login);
  const userID = useAppSelector((state) => state.users.userData.id);
  const wsReadyStatus = useAppSelector((state) => state.messages.wsReadyStatus);

  const funcQueue = (): void => {
    const isInputMessage = messageInput.replace(/\s+/g, "");
    if (isInputMessage) sendMessage();
    // "If" for TS:
    if (inputRef && inputRef.current) inputRef.current.focus();
    setMessageInput("");
  };

  const sendMessage = async (): Promise<void> => {
    try {
      const response = await dispatch(
        sendMessageThunk({ flag, disputeID, userID, userLogin, messageInput })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.sendMessageForm}>
      <span className={styles.userLogin}>{userLogin}:</span>
      <Input
        value={messageInput}
        ref={inputRef}
        className={styles.inputChatMessage}
        type="text"
        placeholder="your text"
        onChange={(e: any) => setMessageInput(e.target.value)}
        onKeyDown={(e: any) => (e.key === "Enter" ? funcQueue() : "")}
      />
      {isLoading || wsReadyStatus !== "ready" ? (
        <div className={styles.preloader}></div>
      ) : (
        <Button
          className={styles.sendMessageBtn}
          disabled={wsReadyStatus !== "ready"}
          onClick={funcQueue}
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default SendMessageForm;
