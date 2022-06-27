import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/reducers/messagesSlice.js";
import { likeMessage } from "../store/reducers/messagesSlice.js";

const Likes = (props) => {
  const dispatch = useDispatch();
  const messageIndex = props.messageIndex;
  // Definition the target array
  const flag = props.flag;

  const likeCounter = useSelector(
    (state) => state.messages[flag][messageIndex].likes
  );

  //Working w/ server
  const serverName = useSelector((state) => state.messages.serverName);
  const likeFunc = function(type) {
    let patchTarget = flag.match(/^(.*?)Messages/);
    patchTarget = patchTarget[1].toUpperCase();
    axios
      .patch(`${serverName}/messages/${patchTarget}/${messageIndex}`, {
        type: type,
      })
      .then((response) => {
        let fetchedMessages = [...response.data];
        dispatch(setMessages({ fetchedMessages, flag }));
      });

    // dispatch(likeMessage({ flag, messageIndex }));
  };

  return <div onClick={() => likeFunc("like")}>{likeCounter}&nbsp;Likes</div>;
};

export default Likes;
