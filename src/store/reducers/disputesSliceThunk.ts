import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store.js";
import { disputesAPI } from "../../api/api";
import { fetchDisputes, setCurrentDispute } from "./disputesSlice";

export const getAllDisputesThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>("disputes/getAllDisputesThunk", async ({}, thunkAPI) => {
  let response: any = await disputesAPI.getAllDisputes();

  if (response.status === 200) {
    const fetchedDisputes = [...response.data];
    thunkAPI.dispatch(fetchDisputes({ fetchedDisputes }));
  }
  return response;
});

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

    if (response.status === 200) {
      let disputeID: any = response.data;

      const wsConnection = new WebSocket(`ws://localhost:3008/`);
      const wsPayload = {
        id: disputeID,
        target: "allDisputes",
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

export const getCurrentDisputeThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>("disputes/getCurrentDisputeThunk", async ({ disputeID }, thunkAPI) => {
  let response: any = await disputesAPI.getCurrentDispute(disputeID);

  if (response.status === 200) {
    const currentDispute = response.data[0];
    thunkAPI.dispatch(setCurrentDispute({ currentDispute }));
  }
  return response;
});
