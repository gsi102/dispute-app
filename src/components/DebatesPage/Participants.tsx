import React from "react";
import { useAppSelector } from "../../hooks/hooks";

const Participants: React.FC<any> = () => {
  const currentDispute: any = useAppSelector(
    (state) => state.disputes.currentDispute
  );
  const senderParticipant = currentDispute.senderParticipant;
  const invitedParticipant = currentDispute.invitedParticipant;

  return (
    <div className="participants">
      <div className="participant-item">{senderParticipant}</div>
      <div className="participant-item">{invitedParticipant}</div>
    </div>
  );
};

export default Participants;
