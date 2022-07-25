import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { createNewDisputeThunk } from "../store/reducers/disputesSliceThunk";

const NewDisputeOptions: React.FC<any> = (props) => {
  const { state }: any = useLocation();
  const { senderParticipant, invitedParticipant } = state;
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const createNewDispute = async () => {
    let response = await dispath(
      createNewDisputeThunk({ senderParticipant, invitedParticipant })
    );
    // const link = response.payload.data;
    // const status = response.payload.status;
    // if (status === 200) {
    //   // navigate(`/${link}`);
    //   // navigate(`/debates-page`);
    //   // console.log(link, status);
    // }
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
