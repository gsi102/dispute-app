import React from "react";
import { useLocation } from "react-router-dom";

const NewDisputeOptions: React.FC<any> = (props) => {
  const { state }: any = useLocation();
  return (
    <div>
      <h1>New dispute!</h1>
      <h2>
        {state.senderParticipant} VS {state.invitedParticipant}
      </h2>
      <h1>Choose dispute boundaries:</h1>
    </div>
  );
};
export default NewDisputeOptions;
