"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isMenuOpen: boolean;
}

const initialState: AppState = {
  isMenuOpen: false,
};

const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    menuState: (state, action: PayloadAction<AppState["isMenuOpen"]>) => {
      state.isMenuOpen = action.payload;
    },
    toggleMenu: (state) => {
    state.isMenuOpen = !state.isMenuOpen;
  },
  },
});

export const { menuState, toggleMenu } = appSlice.actions;

export default appSlice.reducer;
