import React, { useState } from "react";

const Likes = () => {
  const [like, setLike] = useState(false);
  const [likeCounter, setLikeCounter] = useState(0);

  const likes = () => {
    if (like) {
      setLikeCounter(0);
      setLike(false);
    } else {
      setLikeCounter(1);
      setLike(true);
    }
  };

  return <span onClick={likes}>heart{likeCounter}</span>;
};

export default Likes;
