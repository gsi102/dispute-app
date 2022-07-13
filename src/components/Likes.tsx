import React from "react";

type Props = {
  asyncRequestToServer: (arg: string) => void;
  likes: number;
};

const Likes: React.FC<Props> = (props) => {
  const likeCounter = props.likes;

  return (
    <div onClick={() => props.asyncRequestToServer("like")}>
      {likeCounter}&nbsp;Likes
    </div>
  );
};

export default Likes;
