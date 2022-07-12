import {
  createAsyncThunk,
  createSlice,
  current,
  isDraft,
} from "@reduxjs/toolkit";
import { messagesAPI } from "../../api/api.js";

export const fetchedMessagesThunk = createAsyncThunk(
  "messages/fetchedMessagesThunk",
  async (flag, thunkAPI) => {
    let response = await messagesAPI.getMessages(flag);
    const fetchedMessages = [...response.data];
    if (response.status === 200) {
      thunkAPI.dispatch(setMessages({ fetchedMessages, flag }));
    }
    return response.status;
  }
);

export const sendMessageThunk = createAsyncThunk(
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
      // Constant connection required
      // thunkAPI.dispatch(addMessages({ newMessage, flag }));
    }
  }
);

export const deleteAndReturnOrLikeMessageThunk = createAsyncThunk(
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

const messagesSlice = createSlice({
  name: "messages",
  initialState: {},
  reducers: {
    // Update messages list
    setMessages(state, action) {
      const flag = action.payload.flag;
      state[flag] = [...action.payload.fetchedMessages];
      state.showMessages[flag] = [...state[flag]];
    },
    // Search message reducer
    searchMessages(state, action) {
      const inputValue = action.payload.targetValue.toString().toLowerCase();
      const filterTarget = action.payload.flag;
      const filterFunc = function(baseState) {
        const filterMessages = baseState.filter((obj) =>
          obj.messageBody.toLowerCase().includes(inputValue)
        );
        return filterMessages;
      };

      state.showMessages[filterTarget] = filterFunc(state[filterTarget]);
    },
  },
  extraReducers: {
    [fetchedMessagesThunk.fulfilled]: (state, action) => {},
    [sendMessageThunk.fulfilled]: (state, action) => {},
  },
});

export const { setMessages, searchMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
