import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserMetaData } from "@/app/assets/interface/users";
import { get } from "http";

export interface IAuthState {
  authState: boolean;
  user: UserMetaData;
}

const initialState: IAuthState = {
  authState: false,
  user: {} as UserMetaData,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setUser: (state, action: PayloadAction<UserMetaData>) => {
      state.user = action.payload;
    },
  },
  
  
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;