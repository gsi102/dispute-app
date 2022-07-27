import { createAsyncThunk } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api.js";
import { AppDispatch } from "../store.js";
import { setAuth, setUser, searchUsers, setIsLoading } from "./usersSlice";

type SignInArgsType = {
  target: "signIn";
  loginInput: string;
  passwordInput: string;
  navigateOnSuccess: () => void;
};

type SignUpArgsType = {
  target: "signUp";
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
  async (
    { target, loginInput, passwordInput, navigateOnSuccess },
    thunkAPI
  ) => {
    let response;
    try {
      thunkAPI.dispatch(setIsLoading({ target, isLoading: true }));
      response = await usersAPI.signIn(loginInput, passwordInput);
      // Make one object for serializable data
      response = { ...response.data, status: response.status };
      // Vulnerability
      if (response.status === 200) {
        thunkAPI.dispatch(setAuth({ isAuth: true }));
        thunkAPI.dispatch(setUser({ userData: response }));
        navigateOnSuccess();
      }
    } catch (err) {
      alert("Error(console");
      console.log(err);
    }
    thunkAPI.dispatch(setIsLoading({ target, isLoading: false }));
    return response;
  }
);

export const signUpThunk = createAsyncThunk<
  any,
  SignUpArgsType,
  {
    dispatch: AppDispatch;
  }
>(
  "users/signUpThunk",
  async ({ target, credentials, navigateOnSuccess }, thunkAPI) => {
    let response;
    // Disable Prettier plugin for (err: any)
    // prettier-ignore
    try {
      thunkAPI.dispatch(setIsLoading({target, isLoading: true}))
      response = await usersAPI.signUp(credentials);
      if (response.status === 201) {
        navigateOnSuccess();
      }
    } catch (err:any) {
      if (err.response.status === 409) {
        alert(err.response.data);
      }
    }
    thunkAPI.dispatch(setIsLoading({ target, isLoading: false }));
    return response;
  }
);

export const searchUsersThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>(
  "messages/updateMessageThunk",
  async ({ target, searchByLogin }, thunkAPI) => {
    let fetchedUsers: Array<any> = [];
    let response;
    try {
      thunkAPI.dispatch(setIsLoading({ target, isLoading: true }));
      response = await usersAPI.fetchUsers(searchByLogin);
      if (response.status === 200) {
        fetchedUsers = [...response.data];
        thunkAPI.dispatch(searchUsers({ fetchedUsers }));
      } else if (response.status === 204) {
        fetchedUsers = [];
        thunkAPI.dispatch(searchUsers({ fetchedUsers }));
      }
      thunkAPI.dispatch(setIsLoading({ target, isLoading: false }));
    } catch (err) {
      alert("Error(console");
      console.log(err);
    }

    return response.status;
  }
);
