import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { setMessage } from "./message";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


export const login = createAsyncThunk(
  "auth/login",
  // @ts-ignore
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      console.log("success data", data);
      return { user: data };
    } catch (error) {
      console.log("error", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // @ts-ignore
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// @ts-ignore
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    // @ts-ignore
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    // @ts-ignore
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    // @ts-ignore
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
