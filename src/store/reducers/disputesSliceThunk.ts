import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store.js";
import { disputesAPI } from "../../api/api";

// export const getAllDisputesThunk = createAsyncThunk<
//   any,
//   any,
//   {
//     dispatch: AppDispatch;
//   }
// >(
//   "disputes/createNewDisputeThunk",
//   async ({ senderParticipant, invitedParticipant }, thunkAPI) => {
//     let response: any = await disputesAPI.createNewDispute(
//       senderParticipant,
//       invitedParticipant
//     );

//     if (response.status) {
//       const regex = /\_(.*)/gm;
//       let disputeID: any = regex.exec(response.data);

//       const wsConnection = new WebSocket(`ws://localhost:3008/`);
//       const wsPayload = {
//         id: disputeID[1],
//         fetchTarget: "allDisputes",
//         type: "NEW_DISPUTE",
//       };
//       wsConnection.onopen = () => {
//         wsConnection.send(JSON.stringify(wsPayload));
//         wsConnection.close();
//       };
//     }

//     return response;
//   }
// );

export const createNewDisputeThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>(
  "disputes/createNewDisputeThunk",
  async ({ senderParticipant, invitedParticipant }, thunkAPI) => {
    let response: any = await disputesAPI.createNewDispute(
      senderParticipant,
      invitedParticipant
    );

    if (response.status) {
      const regex = /\_(.*)/gm;
      let disputeID: any = regex.exec(response.data);

      const wsConnection = new WebSocket(`ws://localhost:3008/`);
      const wsPayload = {
        id: disputeID[1],
        fetchTarget: "allDisputes",
        type: "NEW_DISPUTE",
      };
      wsConnection.onopen = () => {
        wsConnection.send(JSON.stringify(wsPayload));
        wsConnection.close();
      };
    }

    return response;
  }
);
