import React from "react";
import { useDispatch } from "react-redux";
import Likes from "../Likes";
import { deleteAndReturnOrLikeMessageThunk } from "../../store/reducers/messagesSlice";

const MessageItem = (props) => {
  const dispatch = useDispatch();
  const { id, likes, messageBody, isDeleted, deletedText } = props.message;
  // Name of state
  const flag = props.flag;

  const asyncRequestToServer = function(type) {
    const request = async (textContainer, type) => {
      try {
        let response = await dispatch(
          deleteAndReturnOrLikeMessageThunk({
            id,
            flag,
            textContainer,
            type,
          })
        ).unwrap();
      } catch (err) {
        console.log(err);
      }
    };

    switch (type) {
      case "delete":
        if (isDeleted) return;
        request(messageBody, type);
        break;
      case "return":
        if (isDeleted) request(deletedText, type);
        break;
      case "like":
        request("", type);
        break;
      default:
      //will never execute
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
      {props.message.likes !== null && !isDeleted ? (
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
