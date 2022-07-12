import React, { useEffect } from "react";

import MessageItem from "./MessageItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchedMessagesThunk } from "../../store/reducers/messagesSlice";

const Chat = function(props) {
  const dispatch = useDispatch();
  const flag = props.flag;
  let messages = useSelector((state) => state.messages.showMessages[flag]);

  const firstLoadMessages = useEffect(() => {
    let canceled = false;
    const fetched = (async () => {
      try {
        const response = await dispatch(fetchedMessagesThunk(flag)).unwrap();
        if (canceled) return;
      } catch (err) {
        console.error(err);
        return alert("Error (console)");
      }
    })();

    return () => (canceled = true);
  }, []);

  if (messages[0]) {
    return (
      <div className="chat">
        {messages.map((message) => (
          <MessageItem flag={flag} message={message} key={message.id} />
        ))}
      </div>
    );
  }
};

export default Chat;
