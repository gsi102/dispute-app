import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store.js";
import { disputesAPI } from "../../api/api";

export const createNewDisputeThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>(
  "disputes/createNewDisputeThunk",
  async ({ senderParticipant, invitedParticipant }, thunkAPI) => {
    let response = await disputesAPI.createNewDispute(
      senderParticipant,
      invitedParticipant
    );
    console.log(response);

    return response;
  }
);
