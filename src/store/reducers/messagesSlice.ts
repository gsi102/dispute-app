import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
  isDraft,
} from "@reduxjs/toolkit";
import { messagesAPI } from "../../api/api.js";
import { AppDispatch } from "../store.js";

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
  textContainer: string;
  type: string;
};

type FetchedMessagesPayloadType = {
  flag: Flag;
  fetchedMessages: Array<any>;
};

type SearchMessagesPayloadType = {
  flag: Flag;
  targetValue: string;
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
    if (response.status === 200) {
      // thunkAPI.dispatch(addMessages({ newMessage, flag }));
    }
  }
);

export const deleteAndReturnOrLikeMessageThunk = createAsyncThunk<
  any,
  UpdateMessageType,
  {
    dispatch: AppDispatch;
  }
>(
  "messages/deleteAndReturnOrLikeMessageThunk",
  async ({ id, flag, textContainer, type }, thunkAPI) => {
    let response = await messagesAPI.deleteAndReturnOrLikeMessage(
      id,
      flag,
      textContainer,
      type
    );
    if (response.status === 200) {
      // thunkAPI.dispatch(addMessages({ newMessage, flag }));
    }
  }
);

const initialState: any = {};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Update messages list
    setMessages(state, action: PayloadAction<FetchedMessagesPayloadType>) {
      const flag = action.payload.flag;
      state[flag] = [...action.payload.fetchedMessages];
      state.showMessages[flag] = [...state[flag]];
    },
    // Search message reducer
    searchMessages(state, action: PayloadAction<SearchMessagesPayloadType>) {
      const inputValue = action.payload.targetValue.toString().toLowerCase();
      const filterTarget = action.payload.flag;
      const filterFunc = function(baseState: Array<any>) {
        const filterMessages = baseState.filter((obj: any) =>
          obj.messageBody.toLowerCase().includes(inputValue)
        );
        return filterMessages;
      };

      state.showMessages[filterTarget] = filterFunc(state[filterTarget]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedMessagesThunk.fulfilled, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `fulfilled` action creator
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {});
  },
});

export const { setMessages, searchMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
