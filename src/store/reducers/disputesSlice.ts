import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { createNewDisputeThunk } from "./disputesSliceThunk";

const initialState: any = {};

export const createDisputesSlice = createSlice({
  name: "createDispute",
  initialState,
  reducers: {
    addDisputes(state, action: PayloadAction<any>) {
      state.fetchedDisputes = [
        ...state.fetchedDisputes,
        action.payload.newDispute,
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewDisputeThunk.fulfilled, (state, action) => {});
  },
});

export const { addDisputes } = createDisputesSlice.actions;

export default createDisputesSlice.reducer;
