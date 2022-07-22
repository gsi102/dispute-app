import React from "react";
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Likes from "./Likes";
import { updateMessageThunk } from "../../store/reducers/messagesSlice";
=======
import { useAppDispatch } from "../../hooks/hooks";
import Likes from "./Likes";
import { deleteAndReturnOrLikeMessageThunk } from "../../store/reducers/messagesSlice";
>>>>>>> 0d3c365a43e7235d04b0350634b5dfa586a669b2
import { MessageItemProps } from "../../types/types";

const MessageItem: React.FC<MessageItemProps> = (props) => {

  const dispatch = useAppDispatch();
  let { id, user, likes, messageBody, isDeleted, deletedText } = props.message;
  const userLogin = useAppSelector((state) => state.users.userData.login);
  // Name of state
  const flag = props.flag;
  const asyncRequestToServer = function(type: string) {
    const request = async (textContainer: string, type: string) => {
      try {
        let response = await dispatch(
          updateMessageThunk({
            id,
            userLogin,
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

  function dateTransform(dateValue: number | string) {
    dateValue = (dateValue < 10 ? "0" : "") + dateValue.toString();
    return dateValue;
  }

  return (
    <div className="message-item">
      <div className="message-name-and-text">
        <div className="message-name">{user}:&nbsp;</div>
        <div className="message-text">{messageBody}</div>
      </div>
      {likes !== null && !isDeleted ? (
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
