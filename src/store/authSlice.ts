import { AuthState, UserInterface } from "@/interfaces/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: UserInterface; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Store in cookies
      Cookies.set("token", action.payload.token, { expires: 1 }); // 1 day
      Cookies.set("user", JSON.stringify(action.payload.user), { expires: 1 });
    },
    setUser: (state, action: PayloadAction<UserInterface>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 1 });
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear cookies
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const { setAuth, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
