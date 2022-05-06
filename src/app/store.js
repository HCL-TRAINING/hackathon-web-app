import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import bookReducer from "../slices/book";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    message: messageReducer,
    books: bookReducer,
  },
});
