import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "../services/admin.service";

const initialState = [];

export const retriveBooks = createAsyncThunk("books/retrieve", async () => {
  const res = await adminService.getBooks();
  console.log("book ress", res);
  return res.data;
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [retriveBooks.fulfilled]: (state, action) => {
      console.log("acc", action);
      return [...action.payload];
    }
  },
});

const { reducer } = bookSlice;
export default reducer;
