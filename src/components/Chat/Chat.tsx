import React, { useEffect } from "react";
import MessageItem from "./MessageItem";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  addMessages,
  fetchedMessagesThunk,
} from "../../store/reducers/messagesSlice";
import { Message, FlagAsProps } from "../../types/types";
import { messagesAPI } from "../../api/api";
import { setMessages } from "../../store/reducers/messagesSlice";

const Chat: React.FC<FlagAsProps> = function(props) {
  const dispatch = useAppDispatch();
  const flag = props.flag;
  let messages = useAppSelector(
    (state: any) => state.messages.showMessages[flag]
  );
  const firstLoadMessages = useEffect(() => {
    let canceled = false;
    // Doesn't work. WHY?
    if (!canceled) {
      const fetched = async () => {
        try {
          const response = await dispatch(fetchedMessagesThunk(flag)).unwrap();
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
  }, []);

  if (messages[0]) {
    return (
      <div className="chat">
        {messages.map((message: Message) => (
          <MessageItem flag={flag} message={message} key={message.id} />
        ))}
      </div>
    );
  } else return null;
};

export default Chat;
