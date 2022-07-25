import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const LeftSide: React.FC = () => {
  let fetchedDisputes = useAppSelector(
    (state: any) => state.disputes.fetchedDisputes
  );

  useEffect(() => {}, []);

  return (
    <div className="leftside">
      {fetchedDisputes.map((el: any) => {
        <h1>{el.senderParticipant}</h1>;
      })}
    </div>
  );
};

export default LeftSide;
