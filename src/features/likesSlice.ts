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
          const { snippetId, mark } = action.payload;
          const existingMark = state.marks.find(
            (m) => m.snippetId === snippetId
          );

          if (existingMark) {
            if (existingMark.type === "dislike") {
              state.marks = state.marks.filter(
                (m) => m.snippetId !== snippetId
              );
              state.marks.push({ type: mark, snippetId });
            }
          } else {
            state.marks.push({ type: mark, snippetId });
          }
        }
      )
      .addCase(
        dislikeSnippet.fulfilled,
        (
          state,
          action: PayloadAction<{ snippetId: string; mark: "dislike" }>
        ) => {
          const { snippetId, mark } = action.payload;
          const existingMark = state.marks.find(
            (m) => m.snippetId === snippetId
          );

          if (existingMark) {
            if (existingMark.type === "like") {
              state.marks = state.marks.filter(
                (m) => m.snippetId !== snippetId
              );
              state.marks.push({ type: mark, snippetId });
            }
          } else {
            state.marks.push({ type: mark, snippetId });
          }
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
