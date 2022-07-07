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
          obj.text.toLowerCase().includes(inputValue)
        );
        return filterMessages;
      };

      state.showMessages[filterTarget] = filterFunc(state[filterTarget]);
    },
  },
  extraReducers: {
    [fetchedMessagesThunk.fulfilled]: (state, action) => {},
  },
});

export const {
  setMessages,
  sendMessage,
  deleteMessage,
  searchMessages,
  likeMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
