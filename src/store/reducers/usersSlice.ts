import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

import { signInThunk, signUpThunk } from "./usersSliceThunk";

const initialState: any = {};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading[action.payload.target] = action.payload.isLoading;
    },
    setAuth(state, action) {
      state.isAuth = action.payload.isAuth;
    },
    setUser(state, action: PayloadAction<any>) {
      if (action.payload.userData !== "reset") {
        for (let [key, value] of Object.entries(action.payload.userData)) {
          state.userData[key] = value;
        }
      } else {
        for (let [key, value] of Object.entries(state.userData)) {
          state.userData[key] = "";
        }
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

export const {
  setIsLoading,
  setAuth,
  setUser,
  searchUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
