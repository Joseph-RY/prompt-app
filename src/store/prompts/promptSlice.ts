import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export const getPrompts = createAsyncThunk<Prompt[], void, { rejectValue: string }>(
  "prompts/getPrompts",
  async (_, { rejectWithValue }) => {
    try {
      const snap = await getDocs(collection(db, "prompts"));

      const prompts: Prompt[] = snap.docs.map((d) => {
        const data = d.data() as Partial<Omit<Prompt, "id">>;

        return {
          id: d.id,
          title: data.title ?? "",
          text: data.text ?? "",
          category: data.category ?? "",
          tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
          favorite: Boolean(data.favorite),
          createdByUid: data.createdByUid ?? "",
        };
      });

      return prompts;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to load prompts");
    }
  }
);

export const deletePromptFirebase = createAsyncThunk<string, string, { rejectValue: string }>(
  "prompts/deletePromptFirebase",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "prompts", id));
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to delete prompt");
    }
  }
);

export const updatePromptFirebase = createAsyncThunk<Prompt, Prompt, { rejectValue: string }>(
  "prompts/updatePromptFirebase",
  async (prompt, { rejectWithValue }) => {
    try {
      const { id, ...data } = prompt;

      await updateDoc(doc(db, "prompts", id), {
        title: data.title,
        text: data.text,
        category: data.category,
        tags: data.tags,
        favorite: data.favorite,
        createdByUid: data.createdByUid,
      });

      return prompt;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? "Failed to update prompt");
    }
  }
);

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
      if (index !== -1) state.prompts[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrompts.fulfilled, (state, action) => {
        state.prompts = action.payload;
        state.loading = false;
      })
      .addCase(getPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Failed to load prompts";
      })

      .addCase(deletePromptFirebase.pending, (state) => {
        state.error = null;
      })
      .addCase(deletePromptFirebase.fulfilled, (state, action) => {
        state.prompts = state.prompts.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePromptFirebase.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? "Failed to delete prompt";
      })

      .addCase(updatePromptFirebase.pending, (state) => {
        state.error = null;
      })
      .addCase(updatePromptFirebase.fulfilled, (state, action) => {
        const i = state.prompts.findIndex((p) => p.id === action.payload.id);
        if (i !== -1) state.prompts[i] = action.payload;
      })
      .addCase(updatePromptFirebase.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? "Failed to update prompt";
      });
  },
});

export const { addPrompt, removePrompt, updatePrompt } = promptSlice.actions;
export default promptSlice.reducer;
