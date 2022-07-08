import React from "react";
import { useDispatch } from "react-redux";
import Likes from "../Likes.jsx";
import { deleteAndReturnOrLikeMessageThunk } from "../../store/reducers/messagesSlice.js";

const MessageItem = (props) => {
  const dispatch = useDispatch();
  const messageID = props.message.id;
  const likes = props.message.likes;
  const messageBody = props.message.messageBody;
  console.log(messageBody);
  // Name of state
  const flag = props.flag;
  const isMessageDeleted = props.message.isDeleted;

  const asyncRequestToServer = async function(type) {
    switch (type) {
      case "delete":
        break;
      case "return":
        break;
      default:
      //will never execute
    }

    try {
      let response = await dispatch(
        deleteAndReturnOrLikeMessageThunk({ messageID, flag, type })
      ).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const dateHh = dateTransform(props.message.dateHh);
  const dateMm = dateTransform(props.message.dateMm);
  function dateTransform(dateValue) {
    dateValue = dateValue.toString();
    return (dateValue < 10 ? "0" : "") + dateValue;
  }

  return (
    <div className="message-item" data-message-id={props.message.id}>
      <div className="message-name-and-text">
        <div className="message-name">{props.message.user}:&nbsp;</div>
        <div className="message-text">{props.message.messageBody}</div>
      </div>
      {props.message.likes !== null && !isMessageDeleted ? (
        <Likes asyncRequestToServer={asyncRequestToServer} likes={likes} />
      ) : null}
      <div onClick={() => asyncRequestToServer("delete")}>DEL</div>
      <div onClick={() => asyncRequestToServer("return")}>Return</div>
      <div className="message-time">
        {dateHh}:{dateMm}
      </div>
    </div>
  );
};

export default MessageItem;
