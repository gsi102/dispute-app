import React, { useEffect } from "react";

import * as axios from "axios";
import MessageItem from "./MessageItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../store/reducers/messagesSlice.js";

const Chat = function(props) {
  const dispatch = useDispatch();
  const flag = props.flag;
  let messages = useSelector((state) => state.messages.showMessages[flag]);
11
  /* Working with server. Server is not ready.
  const firstLoadMessages = useEffect(() => {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        let loadMessages = [...response.data.items];
        dispatch(setMessages({ loadMessages, flag }));
      });
  }, []);*/

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
