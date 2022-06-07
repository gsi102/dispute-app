import React from "react";
import Participants from "./Participants.jsx";
import Dispute from "./Dispute.jsx";
import Spectators from "./Spectators.jsx";

const DebatesWindow = () => {
  return (
    <div className="debates-window">
      <Participants />
      <Dispute />
      <Spectators />
    </div>
  );
};

export default DebatesWindow;
