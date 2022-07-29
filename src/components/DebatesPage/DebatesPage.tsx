import React, { useEffect, useMemo, useState } from "react";
import Participants from "./Participants";
import Dispute from "./Dispute";
import Spectators from "./Spectators";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCurrentDispute } from "../../store/reducers/disputesSlice";
import { getCurrentDisputeThunk } from "../../store/reducers/disputesSliceThunk";

import styles from "../../styles/App.module.css";

const DebatesPage: React.FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const location: any = useLocation();

  const re = /^.*\/(.*)/gm;
  let disputeID: any = re.exec(location.pathname);
  disputeID = disputeID[1];

  useEffect(() => {
    dispatch(getCurrentDisputeThunk({ disputeID }));
  }, [disputeID]);

  return (
    <div className={styles.debatesWindow}>
      <Participants />
      <Dispute disputeID={disputeID} />
      <Spectators disputeID={disputeID} />
    </div>
  );
};

export default DebatesPage;
