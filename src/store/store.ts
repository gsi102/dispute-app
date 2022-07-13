import { compose, configureStore } from "@reduxjs/toolkit";
import { ReduxDevtoolsExtensionCompose } from "@redux-devtools/extension";
import messagesReducer from "./reducers/messagesSlice";
import usersReducer from "./reducers/usersSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  messages: {
    // Backend, not for displaying
    disputeMessages: [],
    specMessages: [],
    // For searching and displaying
    showMessages: {
      disputeMessages: [],
      specMessages: [],
    },
    // Source for messages id.
    flagSource: {
      disputeChat: "disputeMessages",
      spectatorChat: "specMessages",
    },
  },
  users: {
    isAuth: false,
    userData: {
      id: "",
      login: "",
      role: "",
      tempRole: "",
      name: "",
      surname: "",
      email: "",
      location: "",
      occupation: "",
      rating: {
        disputesWin: 0,
        disputesLose: 0,
        ratio: 0,
      },
    },
  },
};

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
  },
  preloadedState: {
    messages: initialState.messages,
    users: initialState.users,
  },
  // @ts-ignore
  composeEnhancers,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = typeof initialState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
