import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { customFetch } from "@/utils";
import { RootState } from "@/store";

export const likeSnippet = createAsyncThunk(
  "likes/likeSnippet",
  async (snippetId: string, { getState }) => {
    const state = getState() as RootState;
    const user = state.userState.user;
    if (!user) {
      throw new Error("User  not logged in");
    }

    await customFetch.post(
      `/snippets/${snippetId}/mark`,

      { mark: "like" },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
         //  "Access-Control-Allow-Origin": "*", // Could work and fix the previous problem, but not in all APIs
        },
      }
    );

    return { snippetId, mark: "like" as const };
  }
);

export const dislikeSnippet = createAsyncThunk(
  "likes/dislikeSnippet",
  async (snippetId: string, { getState }) => {
    const state = getState() as RootState;
    const user = state.userState.user;

    if (!user) {
      throw new Error("User  not logged in");
    }

    await customFetch.post(
      `/snippets/${snippetId}/mark`,
      { mark: "dislike" },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
         //  "Access-Control-Allow-Origin": "*", // Could work and fix the previous problem, but not in all APIs
        },
      }
    );

    return { snippetId, mark: "dislike" as const };
  }
);

type Mark = {
  type: "like" | "dislike";
  snippetId: string;
};

type LikesState = {
  marks: Mark[];
  error: string | null;
};

const initialState: LikesState = {
  marks: [],
  error: null,
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
      .addCase(likeSnippet.rejected, (state, action) => {
        console.error(action.error.message);
      })
      .addCase(dislikeSnippet.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

export default likesSlice.reducer;
