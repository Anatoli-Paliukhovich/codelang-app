import { createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "@/utils";
import { RootState } from "@/store";
import { toast } from "sonner";

export const likeSnippet = createAsyncThunk(
  "likes/likeSnippet",
  async (snippetId: string, { getState }) => {
    const state = getState() as RootState;
    const user = state.userState.user;
    if (!user) {
      toast("Please, login");
      throw new Error("User not logged in");
    }
    await customFetch.post(`/snippets/${snippetId}/mark`, { mark: "like" });
    return { snippetId, mark: "like" as const };
  }
);

export const dislikeSnippet = createAsyncThunk(
  "likes/dislikeSnippet",
  async (snippetId: string, { getState }) => {
    const state = getState() as RootState;
    const user = state.userState.user;
    if (!user) {
      toast("Please, login");
      throw new Error("User not logged in");
    }
    await customFetch.post(`/snippets/${snippetId}/mark`, { mark: "dislike" });
    return { snippetId, mark: "dislike" as const };
  }
);
