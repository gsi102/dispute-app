import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api.js";
import { AppDispatch } from "../store.js";

type SignInArgsType = {
  loginInput: string;
  passwordInput: string;
  navigateOnSuccess: () => void;
};

type SignUpArgsType = {
  credentials: {
    login: string;
    password: string;
    email?: string;
  };
  navigateOnSuccess: () => void;
};

export const signInThunk = createAsyncThunk<
  // Return type of the payload creator
  any,
  // First argument to the payload creator
  SignInArgsType,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
  }
>(
  "users/signInThunk",
  async ({ loginInput, passwordInput, navigateOnSuccess }, thunkAPI) => {
    let response = await usersAPI.signIn(loginInput, passwordInput);
    // Make one object for serializable data
    response = { ...response.data, status: response.status };
    // Vulnerability
    if (response.status === 200) {
      thunkAPI.dispatch(setAuth({}));
      thunkAPI.dispatch(setUser({ userData: response }));
      navigateOnSuccess();
    }
    return response;
  }
);

export const signUpThunk = createAsyncThunk<
  any,
  SignUpArgsType,
  {
    dispatch: AppDispatch;
  }
>("users/signUpThunk", async ({ credentials, navigateOnSuccess }, thunkAPI) => {
  let responseStatus = await usersAPI.signUp(credentials);
  if (responseStatus) {
    // Check another options
    navigateOnSuccess();
  }
  return responseStatus;
});

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
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `fulfilled` action creator
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {});
  },
});

export const { setAuth, setUser } = usersSlice.actions;

export default usersSlice.reducer;
