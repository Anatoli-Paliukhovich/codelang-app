import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { likeSnippet, dislikeSnippet } from "../api/index";
import { toast } from "sonner";
import { type Mark } from "@/utils";

type LikesState = {
  marks: Mark[];
};

const initialState: LikesState = {
  marks: [],
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        likeSnippet.fulfilled,
        (state, action: PayloadAction<{ snippetId: string; mark: "like" }>) => {
          const { snippetId } = action.payload;
          state.marks = state.marks.filter(
            (mark) => mark.snippetId !== snippetId || mark.type !== "dislike"
          );
          state.marks.push({ type: "like", snippetId });
        }
      )
      .addCase(
        dislikeSnippet.fulfilled,
        (
          state,
          action: PayloadAction<{ snippetId: string; mark: "dislike" }>
        ) => {
          const { snippetId } = action.payload;
          state.marks = state.marks.filter(
            (mark) => mark.snippetId !== snippetId || mark.type !== "like"
          );
          state.marks.push({ type: "dislike", snippetId });
        }
      )
      .addCase(likeSnippet.rejected, () => {
        toast.error(`You've already liked!`);
      })
      .addCase(dislikeSnippet.rejected, () => {
        toast.error(`You've already disliked!`);
      });
  },
});

export default likesSlice.reducer;
