import { configureStore } from "@reduxjs/toolkit";
import promptsReducer from "./prompts/promptSlice";

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
