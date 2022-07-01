import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/reducers/messagesSlice.js";
import { messagesAPI } from "../api/api.js";

const Likes = (props) => {
  const dispatch = useDispatch();
  const messageIndex = props.messageIndex;
  const flag = props.flag;

  const likeCounter = useSelector(
    (state) => state.messages[flag][messageIndex].likes
  );

  const likeFunc = function(type) {
    messagesAPI
      .deleteAndReturnOrLikeMessage(messageIndex, flag, type)
      .then((data) => {
        let fetchedMessages = [...data];
        dispatch(setMessages({ fetchedMessages, flag }));
      });
  };

  return <div onClick={() => likeFunc("like")}>{likeCounter}&nbsp;Likes</div>;
};

export default Likes;
