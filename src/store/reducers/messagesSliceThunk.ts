import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store.js";

import { messagesAPI } from "../../api/api.js";
import { setMessages } from "./messagesSlice";

type Flag = string;

type SendMessageType = {
  flag: Flag;
  userID: string;
  userLogin: string;
  messageInput: string;
};

type UpdateMessageType = {
  flag: Flag;
  id: string;
  userLogin: string;
  textContainer: string;
  type: string;
};

export const fetchedMessagesThunk = createAsyncThunk<
  any,
  string,
  {
    dispatch: AppDispatch;
  }
>("messages/fetchedMessagesThunk", async (flag, thunkAPI) => {
  let response = await messagesAPI.getMessages(flag);
  const fetchedMessages = [...response.data];

  if (response.status === 200) {
    thunkAPI.dispatch(setMessages({ fetchedMessages, flag }));
  }
  return response.status;
});

export const sendMessageThunk = createAsyncThunk<
  any,
  SendMessageType,
  {
    dispatch: AppDispatch;
  }
>(
  "messages/sendMessageThunk",
  async ({ flag, userID, userLogin, messageInput }, thunkAPI) => {
    let response = await messagesAPI.newMessage(
      flag,
      userID,
      userLogin,
      messageInput
    );
    const newMessage = response.data;

    if (response.status) {
      const wsConnection = new WebSocket(`ws://localhost:3008/`);
      const wsPayload = {
        id: newMessage.id,
        type: "NEW_MESSAGE",
      };
      wsConnection.onopen = () => {
        wsConnection.send(JSON.stringify(wsPayload));
        wsConnection.close();
      };
    }
  }
);

export const updateMessageThunk = createAsyncThunk<
  any,
  UpdateMessageType,
  {
    dispatch: AppDispatch;
  }
>(
  "messages/updateMessageThunk",
  async ({ id, userLogin, flag, textContainer, type }, thunkAPI) => {
    let response = await messagesAPI.updateMessage(
      id,
      userLogin,
      flag,
      textContainer,
      type
    );
    // change response later
    if (response.changedRows === 1) {
      const wsConnection = new WebSocket(`ws://localhost:3008/`);
      const wsPayload = {
        id,
        type: "UPDATE_MESSAGE",
      };
      wsConnection.onopen = () => {
        wsConnection.send(JSON.stringify(wsPayload));
        wsConnection.close();
      };
    }
  }
);
