import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Stores data in localStorage
import authreducer from "./authSlice.js";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage, // Uses localStorage to persist data
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authreducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
