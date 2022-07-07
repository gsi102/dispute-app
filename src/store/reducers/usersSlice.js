import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api.js";

export const signInThunk = createAsyncThunk(
  "users/signInThunk",
  async ({ loginInput, passwordInput, navigateOnSuccess }, thunkAPI) => {
    let response = await usersAPI.signIn(loginInput, passwordInput);
    // Make one object for serializable data
    response = { ...response.data, status: response.status };
    // Vulnerability
    if (response.status === 200) {
      thunkAPI.dispatch(setAuth());
      thunkAPI.dispatch(setUser({ userData: response }));
      navigateOnSuccess();
    }
    return response;
  }
);

export const signUpThunk = createAsyncThunk(
  "users/signUpThunk",
  async ({ credentials, navigateOnSuccess }, thunkAPI) => {
    let responseStatus = await usersAPI.signUp(credentials);
    // Vulnerability
    if (responseStatus === 200) {
      // Check another options
      navigateOnSuccess();
    }
    return responseStatus;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    setAuth(state, action) {
      state.isAuth = true;
    },
    setUser(state, action) {
      for (let [key, value] of Object.entries(action.payload.userData)) {
        state.userData[key] = value;
      }
    },
  },
  extraReducers: {
    // Write logic for another statuses .pending & .rejected
    [signInThunk.fulfilled]: (state, action) => {},
    [signUpThunk.fulfilled]: (state, action) => {},
  },
});

export const { setAuth, setUser } = usersSlice.actions;

export default usersSlice.reducer;
