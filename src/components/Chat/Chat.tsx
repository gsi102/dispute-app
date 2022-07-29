import React, { useEffect } from "react";
import MessageItem from "./MessageItem";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { fetchedMessagesThunk } from "../../store/reducers/messagesSliceThunk";
import { Message, FlagAsProps } from "../../types/types";

import styles from "../../styles/App.module.css";

const Chat: React.FC<any> = function(props) {
  const { flag, disputeID } = props;
  const dispatch = useAppDispatch();
  const messages = useAppSelector(
    (state: any) => state.messages.showMessages[flag]
  );
  // Load messages from DB
  useEffect(() => {
    let canceled = false;
    if (!canceled) {
      const fetched = async () => {
        try {
          const response = await dispatch(
            fetchedMessagesThunk({ flag, disputeID })
          ).unwrap();
        } catch (err) {
          console.error(err);
          return alert("Error (console)");
        }
      };
      fetched();
    }
    return function cleanUp() {
      canceled = true;
    };
  }, [disputeID]);

  if (messages[0]) {
    return (
      <div className={styles.chat}>
        {messages.map((message: Message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </div>
    );
  } else return null;
};

export default Chat;
