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
  userLogin: string;
  textContainer: string;
  type: string;
};

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
