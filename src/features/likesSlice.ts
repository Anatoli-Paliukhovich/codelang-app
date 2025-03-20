import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "@/utils";
import { toast } from "sonner";
import { type Mark } from "@/utils";
import { RootState } from "@/store";

type LikesState = {
  marks: Mark[];
};

const initialState: LikesState = {
  marks: [],
};

export const toggleSnippetLike = createAsyncThunk(
  "likes/toggleSnippetLike",
  async (
    { snippetId, mark }: { snippetId: string; mark: "like" | "dislike" },
    { getState }
  ) => {
    const state = getState() as RootState;
    const user = state.userState.user;
    if (!user) {
      toast("Please, login");
      throw new Error("User  not logged in");
    }
    await customFetch.post(`/snippets/${snippetId}/mark`, { mark });
    return { snippetId, mark };
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        toggleSnippetLike.fulfilled,
        (
          state,
          action: PayloadAction<{ snippetId: string; mark: "like" | "dislike" }>
        ) => {
          const { snippetId, mark } = action.payload;
          state.marks = state.marks.filter(
            (m) =>
              m.snippetId !== snippetId ||
              m.type !== (mark === "like" ? "dislike" : "like")
          );
          state.marks.push({ type: mark, snippetId });
        }
      )
      .addCase(toggleSnippetLike.rejected, (state, action) => {
        if (action.error.message === "User  not logged in") {
          toast.error("Please, login to like or dislike snippets.");
        } else {
          toast.error(`An error occurred: You've already mark this snippet!`);
        }
      });
  },
});

export default likesSlice.reducer;
