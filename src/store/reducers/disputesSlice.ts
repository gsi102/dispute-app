import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import {
  createNewDisputeThunk,
  getAllDisputesThunk,
} from "./disputesSliceThunk";

const initialState: any = {};

export const createDisputesSlice = createSlice({
  name: "createDispute",
  initialState,
  reducers: {
    //may be not needed
    setCurrentDispute(state, action) {
      state.currentDispute.id = action.payload.disputeID;
    },
    fetchDisputes(state, action) {
      state.fetchedDisputes = [...action.payload.fetchedDisputes];
    },
    addDisputes(state, action) {
      state.fetchedDisputes = [
        ...state.fetchedDisputes,
        action.payload.newDispute,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewDisputeThunk.fulfilled, (state, action) => {});
    builder.addCase(getAllDisputesThunk.fulfilled, (state, action) => {});
  },
});

export const {
  fetchDisputes,
  setCurrentDispute,
  addDisputes,
} = createDisputesSlice.actions;

export default createDisputesSlice.reducer;
