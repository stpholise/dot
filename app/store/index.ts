"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/AppSlice";
import userAccountReducer from "./slices/UserAccountSlice";
import remittanceReducer from "./slices/RemittanceSlice";
import { persistStore, persistReducer } from "redux-persist";
import HmoReducer from "./slices/HMOPurchaseSlice";
import storage from "redux-persist/lib/storage/session";

const rootReducer = combineReducers({
  app: appReducer,
  userAccount: userAccountReducer,
  hmo: HmoReducer,
  remittance: remittanceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
