import React from "react";
import { useAppSelector } from "../../hooks/hooks";

import styles from "../../styles/App.module.css";

const Participants: React.FC<any> = () => {
  const currentDispute: any = useAppSelector(
    (state) => state.disputes.currentDispute
  );
  const senderParticipant = currentDispute.senderParticipant;
  const invitedParticipant = currentDispute.invitedParticipant;

  return (
    <div className={styles.participants}>
      <div className={styles.participantItem}>{senderParticipant}</div>
      <div className={styles.participantItem}>{invitedParticipant}</div>
    </div>
  );
};

export default Participants;
