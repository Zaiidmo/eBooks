import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      const { user, accessToken } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = accessToken;
      // Persist to localStorage
      localStorage.setItem("auth", JSON.stringify({ user, accessToken }));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      // Clear localStorage
      localStorage.removeItem("auth");
    },
    hydrate(state) {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const { user, accessToken } = JSON.parse(storedAuth);
        state.isAuthenticated = true;
        state.user = user;
        state.token = accessToken;
      }
    },
  },
});

export const { login, logout, hydrate } = authSlice.actions;

export default authSlice.reducer;
