import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { LikesProps } from "../../types/types";

import styles from "../../styles/App.module.css";
import { getLikesThunk } from "../../store/reducers/messagesSliceThunk";

const Likes: React.FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const { disputeID, messageID, userLogin, likes } = props;
  const isNotLiked = useAppSelector(
    (state) => state.messages.likeStyle.isNotLiked
  );
  const isLiked = useAppSelector((state) => state.messages.likeStyle.isLiked);
  const [currentStyle, setCurrentStyle] = useState("");

  useEffect(() => {
    const callThunk = async () => {
      let response = await dispatch(
        getLikesThunk({
          disputeID,
          messageID,
          userLogin,
        })
      ).unwrap();
      response === 1 ? setCurrentStyle(isLiked) : setCurrentStyle(isNotLiked);
    };
    callThunk();
  }, []);

  const funcQueue = (e: any) => {
    currentStyle === isLiked
      ? setCurrentStyle(isNotLiked)
      : setCurrentStyle(isLiked);
    props.asyncRequestToServer("like");
  };

  console.log("render");

  return (
    <div className={styles.likeWrapper} onClick={(e) => funcQueue(e)}>
      <div className={styles.likeCounter}>{likes}</div>
      <div className={styles[currentStyle]} />
    </div>
  );
};

export default Likes;
