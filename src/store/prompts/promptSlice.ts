import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Prompt {
  id: string;
  title: string;
  text: string;
  category: string;
  tags: string[];
  favorite: boolean;
  createdByUid: string;
}

interface PromptState {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  prompts: [],
  loading: false,
  error: null,
};

type FirebasePromptDoc = {
  name: string;
  fields: {
    title?: { stringValue: string };
    text?: { stringValue: string };
    category?: { stringValue: string };
    tags?: { arrayValue: { values: { stringValue: string }[] } };
    favorite?: { booleanValue: boolean };
    createdByUid?: { stringValue: string };
  };
};

export const getPrompts = createAsyncThunk<Prompt[]>("prompts/getPrompts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://firestore.googleapis.com/v1/projects/prompt-hub-417709/databases/(default)/documents/prompts`);

    const prompts: Prompt[] = response.data.documents.map((doc: FirebasePromptDoc) => {
      const fields = doc.fields || {};
      return {
        id: doc.name.split("/").pop() || "",
        title: fields.title?.stringValue || "",
        text: fields.text?.stringValue || "",
        category: fields.category?.stringValue || "",
        tags: fields.tags?.arrayValue?.values?.map((v) => v.stringValue) || [],
        favorite: fields.favorite?.booleanValue || false,
        createdByUid: fields.createdByUid?.stringValue || "",
      };
    });

    return prompts;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    addPrompt: (state, action: PayloadAction<Prompt>) => {
      state.prompts.push(action.payload);
    },
    removePrompt: (state, action: PayloadAction<string>) => {
      state.prompts = state.prompts.filter((p) => p.id !== action.payload);
    },
    updatePrompt: (state, action: PayloadAction<Prompt>) => {
      const index = state.prompts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.prompts[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrompts.fulfilled, (state, action: PayloadAction<Prompt[]>) => {
        state.prompts = action.payload;
        state.loading = false;
      })
      .addCase(getPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPrompt, removePrompt, updatePrompt } = promptSlice.actions;
export default promptSlice.reducer;
