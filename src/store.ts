import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import likesReducer from "@/features/likesSlice";
import snippetsReducer from "@/features/snippetsSlice";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    likes: likesReducer,
    snippetsState: snippetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
};
