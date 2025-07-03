import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
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

interface PromptsState {
  items: Prompt[];
}

const initialState: PromptsState = {
  items: [],
};

const promptsSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrompts.fulfilled, (state, action: PayloadAction<Prompt[]>) => {
      state.items = action.payload;
    });
    builder.addCase(updatePromptFirebase.fulfilled, (state, action: PayloadAction<Prompt>) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    });
  },
});

export default promptsSlice.reducer;
