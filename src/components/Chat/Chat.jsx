import React, { useEffect } from "react";

import MessageItem from "./MessageItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { messagesAPI } from "../../api/api.js";
import { setMessages } from "../../store/reducers/messagesSlice.js";

const Chat = function(props) {
  const dispatch = useDispatch();
  const flag = props.flag;
  let messages = useSelector((state) => state.messages.showMessages[flag]);

  const firstLoadMessages = useEffect(() => {
    messagesAPI.getMessages(flag).then((data) => {
      let fetchedMessages = [...data];
      dispatch(setMessages({ fetchedMessages, flag }));
    });
  }, []);

  if (messages[0]) {
    return (
      <div className="chat">
        {messages.map((message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </div>
    );
  }
};

export default Chat;
