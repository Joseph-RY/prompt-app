import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
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
      return rejectWithValue(e?.message ?? "Request failed");
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
