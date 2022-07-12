import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevToolsLogOnlyInProduction } from "@redux-devtools/extension";
import messagesReducer from "./reducers/messagesSlice.js";
import usersReducer from "./reducers/usersSlice";

const composeEnhancers = composeWithDevToolsLogOnlyInProduction({});

const initialState = {
  messagesState: {
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
  usersState: {
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

export default configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
  },
  preloadedState: {
    messages: initialState.messagesState,
    users: initialState.usersState,
  },
  composeEnhancers,
});

// export default function configureAppStore(preloadedState) {
//   const store = configureStore({
//     reducer: rootReducer,
//
//     preloadedState,
//     enhancers: [monitorReducersEnhancer],
//   })

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   }

//   return store
// }
