import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./reducers/messagesSlice";

export default configureStore({
  reducer: {
    messages: messagesReducer,
  },
});
