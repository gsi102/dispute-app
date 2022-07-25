import React, { useEffect } from "react";
import MessageItem from "./MessageItem";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { fetchedMessagesThunk } from "../../store/reducers/messagesSliceThunk";
import { Message, FlagAsProps } from "../../types/types";

const Chat: React.FC<FlagAsProps> = function(props) {
  const dispatch = useAppDispatch();
  const flag = props.flag;
  let fetchTarget: string[] | string | null = flag.match(/(.*?)Messages/gm);
  // For TS
  fetchTarget ? (fetchTarget = fetchTarget[1]) : "";

  let messages = useAppSelector(
    (state: any) => state.messages.showMessages[flag]
  );

  const firstLoadMessages = useEffect(() => {
    let canceled = false;
    if (!canceled) {
      const fetched = async () => {
        try {
          const response = await dispatch(
            fetchedMessagesThunk({ flag, fetchTarget })
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
