import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { likeMessage } from "../store/reducers/messagesSlice.js";

const Likes = (props) => {
  const dispatch = useDispatch();
  const messageIndex = Number(props.messageId.match(/\d+/g));
  // Definition the target array
  const flag = props.messageId.match(/[^_]*/g);

  const likeCounter = useSelector(
    (state) => state.messages[flag[0]][messageIndex].likes
  );

  const likeFunc = function() {
    dispatch(likeMessage({ messageIndex, flag }));
  };

  return <div onClick={likeFunc}>{likeCounter}&nbsp;Likes</div>;
};

export default Likes;
