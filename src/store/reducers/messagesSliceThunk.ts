import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store.js";

import { messagesAPI } from "../../api/api.js";
import { setMessages, setIsLoading } from "./messagesSlice";

type Flag = string;

type SendMessageType = {
  flag: string;
  disputeID: string;
  userID: string;
  userLogin: string;
  messageInput: string;
};

type UpdateMessageType = {
  id: string;
  currentUser: string;
  updateTarget: string;
  textContainer: string;
  type: string;
};

export const fetchedMessagesThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>("messages/fetchedMessagesThunk", async ({ flag, disputeID }, thunkAPI) => {
  let response = await messagesAPI.getMessages(flag, disputeID);
  const fetchedMessages = [...response.data];
  if (response.status === 200) {
    thunkAPI.dispatch(setMessages({ fetchedMessages, flag }));
  }
  return response.status;
});

export const getLikesThunk = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
  }
>(
  "messages/getLikesThunk",
  async ({ disputeID, messageID, userLogin }, thunkAPI) => {
    let response = await messagesAPI.getLikes(disputeID, messageID, userLogin);

    return response.data;
  }
);

export const sendMessageThunk = createAsyncThunk<
  any,
  SendMessageType,
  {
    dispatch: AppDispatch;
  }
>(
  "messages/sendMessageThunk",
  async ({ flag, disputeID, userID, userLogin, messageInput }, thunkAPI) => {
    const fetchTarget = flag + "_" + disputeID;
    let response;
    try {
      thunkAPI.dispatch(setIsLoading({ target: flag, isLoading: true }));
      response = await messagesAPI.newMessage(
        fetchTarget,
        userID,
        userLogin,
        messageInput
      );
      const newMessage = response.data;
      if (response.status) {
        const wsConnection = new WebSocket(`ws://localhost:3008/`);
        const wsPayload = {
          id: newMessage.id,
          target: fetchTarget,
          type: "NEW_MESSAGE",
        };
        wsConnection.onopen = () => {
          wsConnection.send(JSON.stringify(wsPayload));
          wsConnection.close();
        };
      }
    } catch (err) {
      alert("Error(console");
      console.log(err);
    }
    thunkAPI.dispatch(setIsLoading({ target: flag, isLoading: false }));
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
  async ({ id, currentUser, updateTarget, textContainer, type }, thunkAPI) => {
    let response = await messagesAPI.updateMessage(
      id,
      currentUser,
      updateTarget,
      textContainer,
      type
    );

    // if (response.additional === 1) {
    //   additionalCb(`likeHeartActive`);
    // } else {
    //   additionalCb(`likeHeartInactive`);
    // }
    if (response.changedRows === 1) {
      const wsConnection = new WebSocket(`ws://localhost:3008/`);
      const wsPayload = {
        id,
        target: updateTarget,
        type: "UPDATE_MESSAGE",
      };
      wsConnection.onopen = () => {
        wsConnection.send(JSON.stringify(wsPayload));
        wsConnection.close();
      };
    }
  }
);
