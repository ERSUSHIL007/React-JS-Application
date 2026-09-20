import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/CounterSlice";
import { postsApiSlice } from "./posts/postsApiSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,

    //Register RTK Query
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
  },

  //Add Middleware for Caching
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postsApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
