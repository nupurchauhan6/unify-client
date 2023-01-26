import { configureStore } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import { combineReducers } from "redux";
import authedUser from "./reducers/authedUser";
import events from "./reducers/events";
import { loadingBarReducer } from "react-redux-loading-bar";

const reducer = combineReducers({
    authedUser,
    events,
    loadingBar: loadingBarReducer,
});

const store = configureStore({ reducer: reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger) });

export default store;