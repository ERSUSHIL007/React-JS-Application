import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/CounterSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
