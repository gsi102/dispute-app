import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./reducers/messagesSlice";
import usersReducer from "./reducers/usersSlice";

export default configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
  },
});
