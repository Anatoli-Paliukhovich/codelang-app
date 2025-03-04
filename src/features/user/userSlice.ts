import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type User = {
  username: string;
  id: string;
};

type UserState = {
  user: User | null;
};

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      toast("Successfully logged in!");
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
