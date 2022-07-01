import { createSlice, current, isDraft } from "@reduxjs/toolkit";

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
    // Search message reducer - PURE FUNCTION
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
});

export const {
  setMessages,
  sendMessage,
  deleteMessage,
  searchMessages,
  likeMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
