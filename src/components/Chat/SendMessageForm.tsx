import React, { useRef, useState } from "react";
import Input from "../UI/inputs/Input.jsx";
import Button from "../UI/buttons/Button.jsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sendMessageThunk } from "../../store/reducers/messagesSlice";
import { FlagAsProps } from "../../types/types";

const SendMessageForm: React.FC<FlagAsProps> = function(props) {
  const [messageInput, setMessageInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const flag = props.flag;
  const userLogin = useAppSelector((state) => state.users.userData.login);
  const userID = useAppSelector((state) => state.users.userData.id);

  const sendMessage = async (): Promise<void> => {
<<<<<<< HEAD
    // //WS/////////////////////
    // const wsConnection = new WebSocket(`ws://localhost:3008/`);

    // const thunkDispatch = async () => {
    //   const messageData = JSON.stringify({
    //     flag,
    //     userID,
    //     userLogin,
    //     messageInput,
    //   });
    //   wsConnection.send(messageData);
    //   // try {
    //   //   const response = await dispatch(
    //   //     sendMessageThunk({ flag, userID, userLogin, messageInput })
    //   //   ).unwrap();
    //   // } catch (err) {
    //   //   console.error(err);
    //   // }
    // };

    // // re-write: https://ru.stackoverflow.com/questions/531827/websocket-still-in-connecting-state
    // if (!wsConnection.readyState) {
    //   setTimeout(function() {
    //     thunkDispatch();
    //   }, 100);
    // } else {
    //   thunkDispatch();
    // }
    // wsConnection.addEventListener("message", (e) => {
    //   console.log(e);
    // });
    ////////////////////////////////
=======
>>>>>>> eacb4b1 (big update, work on likes logic, work w/ server)

    try {
      const response = await dispatch(
        sendMessageThunk({ flag, userID, userLogin, messageInput })
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
    <div className="dispute-chat-form">
      <Input
        value={messageInput}
        ref={inputRef}
        className="input-chat-message"
        type="text"
        placeholder="your text"
        onChange={(e: any) => setMessageInput(e.target.value)}
        onKeyDown={(e: any) => (e.key === "Enter" ? funcQueue() : "")}
      />
      <Button className="send-message-btn" onClick={funcQueue}>
        Send
      </Button>
    </div>
  );
};

export default SendMessageForm;
