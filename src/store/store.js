import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { composeWithDevToolsLogOnlyInProduction } from "@redux-devtools/extension";
// import { composeWithDevTools } from "@redux-devtools/extension";
import messagesReducer from "./reducers/messagesSlice";
import usersReducer from "./reducers/usersSlice";

const composeEnhancers = composeWithDevToolsLogOnlyInProduction({
  // applyMiddleware()
});

export const serverName = "http://localhost:3003";

const initialState = {
  messagesState: {
    // serverName: serverName,
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
  },
  usersState: {
    // serverName: serverName,
    isAuth: false,
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

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  composeEnhancers,
});

// const rootReducer = { messages: messagesReducer, users: usersReducer };

// import loggerMiddleware from './middleware/logger'

// export default function configureAppStore(preloadedState) {
//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(loggerMiddleware),
//     preloadedState,
//     enhancers: [monitorReducersEnhancer],
//   })

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
//   }

//   return store
// }
