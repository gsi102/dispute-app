import React, { useEffect, useState } from "react";
import Participants from "./Participants";
import Dispute from "./Dispute";
import Spectators from "./Spectators";

const DebatesPage: React.FC = () => {
  return (
    <div className="debates-window">
      <Participants />
      <Dispute />
      <Spectators />
    </div>
  );
};

export default DebatesPage;
