import React from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { createNewDisputeThunk } from "../store/reducers/createDisputeSliceThunk";

const NewDisputeOptions: React.FC<any> = (props) => {
  const { state }: any = useLocation();
  const dispath = useAppDispatch();

  const { senderParticipant, invitedParticipant } = state;

  const createNewDispute = async () => {
    let response = await dispath(
      createNewDisputeThunk({ senderParticipant, invitedParticipant })
    );
  };

  return (
    <div>
      <h1>New dispute!</h1>
      <h2>
        {senderParticipant} VS {invitedParticipant}
      </h2>
      <h1>Choose dispute boundaries:</h1>
      <div
        onClick={() => {
          createNewDispute();
        }}
      >
        <span>create dispute</span>
      </div>
    </div>
  );
};
export default NewDisputeOptions;
