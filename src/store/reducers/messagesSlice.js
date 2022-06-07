import { createSlice, current } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    // Backend, not for displaying
    disputeMessages: [
      {
        date: new Date(), //non-serializable value
        id: "d_messageId_0",
        name: "Participant0",
        text: "Text your arguments below",
      },
    ],
    // For searching and displaying
    showDisputeMessages: [
      {
        date: new Date(), //non-serializable value
        id: "d_messageId_0",
        name: "Participant0",
        text: "Text your arguments below",
      },
    ],
    specMessages: [
      {
        date: new Date(), //non-serializable value
        id: "s_messageId_0",
        name: "Admin",
        text: "Welcome to spec chat!",
      },
    ],
    /* Source for message id. Very important! Used in functions: sendMessage, deleteMessage */
    flagSource: {
      disputeChat: "d",
      spectatorChat: "s",
    },
  },
  reducers: {
    // Send message reducer
    sendMessage(state, action) {
      const messageInput = action.payload.messageInput.toString();
      const flag = action.payload.flag;
      const isInputMessage = messageInput.replace(/\s+/g, "");

      if (isInputMessage) {
        let date = new Date();

        function dateTransform(dateValue) {
          return ((dateValue < 10 ? "0" : "") + dateValue).toString();
        }

        let newMessage = {
          dateHh: dateTransform(date.getHours()),
          dateMm: dateTransform(date.getMinutes()),
          dateFull: date,
          id: "",
          name: "someName",
          text: messageInput,
        };

        if (flag === "d") {
          newMessage.id = flag + "_messageId_" + state.disputeMessages.length;
          state.disputeMessages.push(newMessage);
          state.showDisputeMessages.push(newMessage);
        } else {
          newMessage.id = flag + "_messageId_" + state.specMessages.length;
          state.specMessages.push(newMessage);
        }
      } else {
        alert("Your message is empty!");
      }
    },

    deleteMessage(state, action) {
      // Getting the first sign as a source and the digits as an index
      let deletedId = action.payload.messageId;
      let flag = deletedId.match(/[^]/);
      deletedId = Number(deletedId.match(/\d+/g));

      if (flag[0] === "s") {
        if (!state.specMessages[deletedId].deletedText)
          state.specMessages[deletedId].deletedText =
            state.specMessages[deletedId].text;

        state.specMessages[deletedId].text =
          "Message has been deleted by moderator";
      } else {
        if (!state.disputeMessages[deletedId].deletedText)
          state.disputeMessages[deletedId].deletedText =
            state.disputeMessages[deletedId].text;

        state.disputeMessages[deletedId].text =
          "Message has been deleted by moderator";
        state.showDisputeMessages[deletedId].text =
          "Message has been deleted by moderator";
      }
    },
    searchMessages(state, action) {
      const inputValue = action.payload.targetValue.toString().toLowerCase();
      const filterMessages = state.disputeMessages.filter((obj) =>
        obj.text.toLowerCase().includes(inputValue)
      );
      state.showDisputeMessages = filterMessages;
    },
  },
});

export const {
  sendMessage,
  deleteMessage,
  searchMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
