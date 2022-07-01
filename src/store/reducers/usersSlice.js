import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    setAuth(state, action) {
      state.isAuth = true;
    },
  },
});

export const { setAuth } = usersSlice.actions;

export default usersSlice.reducer;
