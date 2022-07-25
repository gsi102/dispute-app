import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

import { signInThunk, signUpThunk } from "./usersSliceThunk";

const initialState: any = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = true;
    },
    setUser(state, action: PayloadAction<any>) {
      for (let [key, value] of Object.entries(action.payload.userData)) {
        state.userData[key] = value;
      }
    },
    searchUsers(state, action: PayloadAction<any>) {
      state.fetchedUsers = [...action.payload.fetchedUsers];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `fulfilled` action creator
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {});
  },
});

export const { setAuth, setUser, searchUsers } = usersSlice.actions;

export default usersSlice.reducer;
