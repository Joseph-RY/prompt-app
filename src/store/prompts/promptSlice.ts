import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Prompt {
  id: string;
  title: string;
  text: string;
  category?: string;
  tags?: string[];
  favorite?: boolean;
  createdByUid?: string;
}

export const getPrompts = createAsyncThunk<Prompt[]>("prompts/getPrompts", async () => {
  const projectId = "prompt-app-22d1f";
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/prompts`;

  const response = await axios.get(url);
  if (!response.data.documents) return [];

  return response.data.documents.map((doc: any) => {
    const fields = doc.fields || {};
    return {
      id: doc.name.split("/").pop() || "",
      title: fields.title?.stringValue || "",
      text: fields.text?.stringValue || "",
      category: fields.category?.stringValue || "",
      tags: fields.tags?.arrayValue?.values?.map((v: any) => v.stringValue) || [],
      favorite: fields.favorite?.booleanValue || false,
      createdByUid: fields.createdByUid?.stringValue || "",
    };
  });
});

export const updatePromptFirebase = createAsyncThunk<Prompt, { id: string; changes: Partial<Prompt> }>("prompts/updatePromptFirebase", async ({ id, changes }) => {
  const promptRef = doc(db, "prompts", id);
  await updateDoc(promptRef, changes);
  return { id, ...changes } as Prompt;
});

export const deletePromptFirebase = createAsyncThunk<string, string>("prompts/deletePromptFirebase", async (id: string) => {
  const promptRef = doc(db, "prompts", id);
  await deleteDoc(promptRef);
  return id;
});

interface PromptsState {
  items: Prompt[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptsState = {
  items: [],
  loading: false,
  error: null,
};

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPrompts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPrompts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getPrompts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePromptFirebase.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default promptSlice.reducer;
