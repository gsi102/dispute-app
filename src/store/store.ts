import { compose, configureStore } from "@reduxjs/toolkit";
import { ReduxDevtoolsExtensionCompose } from "@redux-devtools/extension";
import messagesReducer from "./reducers/messagesSlice";
import usersReducer from "./reducers/usersSlice";
import disputesReducer from "./reducers/disputesSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  messages: {
    isLoading: {
      dispute: false,
      spec: false,
    },
    wsReadyStatus: "pending",
    // Source for messages id.
    flagSource: {
      disputeChat: "dispute",
      spectatorChat: "spec",
    },
    // Backend, not for displaying
    dispute: [],
    spec: [],
    // For searching and displaying
    showMessages: {
      dispute: [],
      spec: [],
    },
    likeStyle: {
      isNotLiked: `likeHeartInactive`,
      isLiked: `likeHeartActive`,
    },
  },
  users: {
    isLoading: {
      searchOpponentForDispute: false,
      signIn: false,
      signUp: false,
    },
    isAuth: false,
    fetchedUsers: [],
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
  disputes: {
    currentDispute: {},
    fetchedDisputes: [],
  },
};

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
    disputes: disputesReducer,
  },
  preloadedState: {
    messages: initialState.messages,
    users: initialState.users,
    disputes: initialState.disputes,
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
