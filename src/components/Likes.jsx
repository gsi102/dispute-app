import React from "react";

const Likes = (props) => {
  const likeCounter = props.likes;

  return (
    <div onClick={() => props.asyncRequestToServer("like")}>
      {likeCounter}&nbsp;Likes
    </div>
  );
};

export default Likes;
