import React, { useEffect } from "react";

import * as axios from "axios";
import MessageItem from "./MessageItem.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../store/reducers/messagesSlice.js";

const Chat = function(props) {
  const dispatch = useDispatch();
  const flag = props.flag;
  let messages = useSelector((state) => state.messages.showMessages[flag]);

  // working with server
  const serverName = useSelector((state) => state.messages.serverName);
  let fetchTarget = flag.match(/^(.*?)Messages/);
  fetchTarget = fetchTarget[1].toUpperCase();
  const firstLoadMessages = useEffect(() => {
    // Make an async HTTP request
    axios.get(`${serverName}/messages/${fetchTarget}`).then((response) => {
      let fetchedMessages = [...response.data];
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
