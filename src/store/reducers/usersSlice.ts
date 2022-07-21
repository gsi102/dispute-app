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
    let response;
    try {
      response = await usersAPI.signIn(loginInput, passwordInput);
      // Make one object for serializable data
      response = { ...response.data, status: response.status };
      // Vulnerability
      if (response.status === 200) {
        thunkAPI.dispatch(setAuth({}));
        thunkAPI.dispatch(setUser({ userData: response }));
        navigateOnSuccess();
      }
    } catch (err) {
      alert("Error(console");
      console.log(err);
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
  let response;
  // Disable Prettier plugin for (err: any)
  // prettier-ignore
  try {
    response = await usersAPI.signUp(credentials);
    if (response.status === 200) {
      // Check another options
      navigateOnSuccess();
    }
  } catch (err:any) {
    if (err.response.status === 409) {
      alert(err.response.data);
    }
  }
  return response;
});

export const searchUsersThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>("messages/updateMessageThunk", async ({ searchByLogin }, thunkAPI) => {
  let fetchedUsers: Array<any> = [];
  let response;
  try {
    response = await usersAPI.fetchUsers(searchByLogin);

    if (response.status === 200) {
      fetchedUsers = [...response.data];
      thunkAPI.dispatch(searchUsers({ fetchedUsers }));
    } else if (response.status === 204) {
      fetchedUsers = [];
      thunkAPI.dispatch(searchUsers({ fetchedUsers }));
    }
  } catch (err) {
    alert("Error(console");
    console.log(err);
    // fetchedUsers = [];
    // thunkAPI.dispatch(searchUsers({ fetchedUsers }));
  }

  return response.status;
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
