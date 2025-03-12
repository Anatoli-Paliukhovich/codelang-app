import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Snippet } from "@/utils";
import { customFetch } from "@/utils";

const initialState: Snippet = {
  id: "",
  language: "",
  code: "",
  marks: [],
  user: { id: 1, username: "", role: "user" },
  comments: [],
};
export const addComment = createAsyncThunk(
  "snippets/addComment",
  async ({ content, snippetId }: { content: string; snippetId: number }) => {
    try {
      console.log("Sending comment:", content, "for snippetId:", snippetId);
      const response = await customFetch.post(`/comments`, {
        content,
        snippetId,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending comment:", error);
      throw new Error("Failed to send comment");
    }
  }
);

export const updateComment = createAsyncThunk(
  "snippets/updateComment",
  async ({ id, content }: { id: number; content: string }) => {
    const response = await customFetch.patch(`/comments/${id}`, { content });
    if (response.status !== 200) {
      throw new Error("Failed to update comment");
    }
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "snippets/deleteComment",
  async (id: number) => {
    const response = await customFetch.delete(`/comments/${id}`);
    if (response.status !== 200) {
      throw new Error("Failed to delete comment");
    }
    return response.data;
  }
);

const snippetsSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {
    snippetInfo: (state, action: PayloadAction<Snippet>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        const newComment = action.payload;
        state.comments.push(newComment);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload;
        const index = state.comments.findIndex(
          (comment) => comment.id === updatedComment.id
        );
        if (index !== -1) {
          state.comments[index] = updatedComment;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const deletedCommentId = action.payload.id;
        state.comments = state.comments.filter(
          (comment) => comment.id !== deletedCommentId
        );
      });
  },
});

export const { snippetInfo } = snippetsSlice.actions;
export default snippetsSlice.reducer;
