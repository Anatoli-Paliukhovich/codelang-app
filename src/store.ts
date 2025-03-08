import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import likesReducer from "@/features/likesSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    likes: likesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
