"use client"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import appReducer from "./slices/AppSlice"
import userAccountReducer from "./slices/UserAccountSlice"

const rootReducer = combineReducers({
    app: appReducer,
    userAccount: userAccountReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;