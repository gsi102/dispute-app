import React from "react";
import { LikesProps } from "../../types/types";

const Likes: React.FC<LikesProps> = (props) => {

  const likeCounter = props.likes;

  return (
    <div onClick={() => props.asyncRequestToServer("like")}>
      {likeCounter}&nbsp;Likes
    </div>
  );
};

export default Likes;
