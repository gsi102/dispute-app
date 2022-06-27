import { createSlice, current, isDraft } from "@reduxjs/toolkit";
import * as axios from "axios";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    // Backend, not for displaying
    disputeMessages: [],
    specMessages: [],
    // For searching and displaying
    showMessages: {
      disputeMessages: [],
      specMessages: [],
    },
    // Source for messages id. DON'T CHANGE!
    _flagSource: {
      disputeChat: "disputeMessages",
      spectatorChat: "specMessages",
    },
    serverName: "http://localhost:3003",
  },
  reducers: {
    // Update messages list
    setMessages(state, action) {
      const flag = action.payload.flag;
      state[flag] = [...action.payload.fetchedMessages];
      state.showMessages[flag] = [...state[flag]];
    },

    // Send message reducer - NOT USED when working w/ server
    // sendMessage(state, action) {
    // const messageInput = action.payload.messageInput.toString();
    // const flag = action.payload.flag;
    // let date = new Date();
    // function dateTransform(dateValue) {
    //   return ((dateValue < 10 ? "0" : "") + dateValue).toString();
    // }
    // let newMessage = {
    //   dateHh: dateTransform(date.getHours()),
    //   dateMm: dateTransform(date.getMinutes()),
    //   dateFull: date.toString(),
    //   id: "",
    //   name: "someName",
    //   text: messageInput,
    //   deleted: false,
    // };
    // // Setting likes only for disputeMessages
    // if (flag.search(/^[d]/) === 0) newMessage.likes = 0;
    // // Setting correct id
    // newMessage.id = flag + "_" + state[flag].length;
    //pushing message
    // state[flag].push(newMessage);
    // state.showMessages[flag] = [...state[flag]];
    // },
    // Delete message reducer - PURE FUNCTION - NOT USED when working w/ server
    // deleteMessage(state, action) {
    //   let deletedId = action.payload.messageId;
    //   // Definition the target array
    //   const flag = deletedId.match(/[^_]*/g);
    //   // Getting an index in array of messages
    //   deletedId = Number(deletedId.match(/\d+/g));
    //   const element = state[flag[0]][deletedId];
    //   if (!element.deletedText) element.deletedText = element.text;
    //   if (!element.deleted) element.deleted = !element.deleted;
    //   element.text = "Message has been deleted by moderator";
    //   state.showMessages[flag[0]] = [...state[flag[0]]];
    // },
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
    // Like message reducer - PURE FUNCTION  - NOT USED when working w/ server
    // likeMessage(state, action) {
    //   const likedId = action.payload.messageIndex;
    //   const flag = action.payload.flag;
    //   ++state[flag][likedId].likes;
    // },
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
