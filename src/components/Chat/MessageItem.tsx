import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Likes from "./Likes";
import { updateMessageThunk } from "../../store/reducers/messagesSliceThunk";

import { MessageItemProps } from "../../types/types";
import { useLocation } from "react-router-dom";
import styles from "../../styles/App.module.css";

const MessageItem: React.FC<MessageItemProps> = (props) => {
  let {
    id,
    userLogin,
    likes,
    messageBody,
    isDeleted,
    deletedText,
  } = props.message;
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const currentUser = useAppSelector((state) => state.users.userData.login);
  const isAuth = useAppSelector((state) => state.users.isAuth);
  const re1 = /(^.*)_/gm;
  let flag: any = re1.exec(id);
  flag = flag[1];
  const re2 = /^.*\/(.*)/gm;
  let disputeID: any = re2.exec(location.pathname);
  disputeID = disputeID[1];
  const updateTarget = flag + "_" + disputeID;

  const asyncRequestToServer = function(type: string) {
    const request = async (textContainer: string, type: string) => {
      try {
        let response = await dispatch(
          updateMessageThunk({
            id,
            currentUser,
            updateTarget,
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
    <div className={styles.messageItem}>
      <div className={styles.messageSender}>{userLogin}</div>
      <div className={styles.messageText}>{messageBody}</div>
      {likes !== null && !isDeleted && isAuth ? (
        <Likes
          asyncRequestToServer={asyncRequestToServer}
          messageID={id}
          disputeID={disputeID}
          userLogin={currentUser}
          likes={likes}
        />
      ) : null}
      <div className={styles.messageActionsWrapper}>
        <div className={styles.messageActions}>
          <div
            className={styles.delMessage}
            onClick={() => asyncRequestToServer("delete")}
          >
            DEL
          </div>
          <div
            className={styles.retMessage}
            onClick={() => asyncRequestToServer("return")}
          >
            Return
          </div>
        </div>
      </div>
      <div className={styles.messageTime}>
        {dateHh}:{dateMm}
      </div>
    </div>
  );
};

export default MessageItem;
