import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

const initialState: any = {};

export const createDisputeSlice = createSlice({
  name: "createDispute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(signUpThunk.fulfilled, (state, action) => {});
  },
});

export const {} = createDisputeSlice.actions;

export default createDisputeSlice.reducer;
