import React, { useEffect, useMemo, useState } from "react";
import Participants from "./Participants";
import Dispute from "./Dispute";
import Spectators from "./Spectators";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { setCurrentDispute } from "../../store/reducers/disputesSlice";

const DebatesPage: React.FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const regex = /^.*\/(.*)/gm;
  let disputeID: any = regex.exec(location.pathname);
  disputeID = disputeID[1];

  useEffect(() => {
    dispatch(setCurrentDispute({ disputeID }));
  }, [disputeID]);

  return (
    <div className="debates-window">
      <Participants />
      <Dispute disputeID={disputeID} />
      <Spectators disputeID={disputeID} />
    </div>
  );
};

export default DebatesPage;
