import { createSlice, PayloadAction, current, isDraft } from "@reduxjs/toolkit";
import {
  fetchedMessagesThunk,
  sendMessageThunk,
  updateMessageThunk,
} from "./messagesSliceThunk";

type Flag = string;

type FetchedMessagesPayloadType = {
  flag: Flag;
  fetchedMessages: Array<any>;
};

type AddMessagesPayloadType = {
  flag: Flag;
  newMessage: {
    id: string;
    dateHh: number;
    dateMm: number;
    dateSs: number;
    dateMs: number;
    dateFull: string;
    userID: string;
    user: string;
    messageBody: string;
    deletedText: string;
    isDeleted: boolean;
    wasDeleted: boolean;
    likes: number | null;
  };
};

type SearchMessagesPayloadType = {
  flag: Flag;
  searchByText: string;
};

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
      const inputValue = action.payload.searchByText.toString().toLowerCase();
      const filterTarget = action.payload.flag;
      const filterFunc = function(baseState: Array<any>) {
        const filterMessages = baseState.filter((obj: any) =>
          obj.messageBody.toLowerCase().includes(inputValue)
        );
        return filterMessages;
      };

      state.showMessages[filterTarget] = filterFunc(state[filterTarget]);
    },
    // Add new messages in Chat - local state changing.
    addMessages(state, action: PayloadAction<AddMessagesPayloadType>) {
      const flag = action.payload.flag;
      state[flag] = [...state[flag], action.payload.newMessage];
      state.showMessages[flag] = [...state[flag]];
    },
    // Update messages - local state changing.
    updateMessages(state, action: PayloadAction<any>) {
      const flag = action.payload.flag;
      const message = action.payload.updatedMessage;
      const index = state[flag].findIndex(
        (element: any) => element.id === message.id
      );
      // Can do this because RTK goes w/ Immer.
      state[flag].splice(index, 1, message);
      state.showMessages[flag] = [...state[flag]];
    },
    wsConnectionUpdate(state, action) {
      state.wsReadyStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchedMessagesThunk.fulfilled, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `fulfilled` action creator
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {});
    builder.addCase(updateMessageThunk.fulfilled, (state, action) => {});
  },
});

export const {
  setMessages,
  searchMessages,
  addMessages,
  updateMessages,
  wsConnectionUpdate,
} = messagesSlice.actions;

export default messagesSlice.reducer;
