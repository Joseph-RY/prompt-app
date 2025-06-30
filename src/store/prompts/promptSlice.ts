import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Prompt {
  id: string;
  title: string;
  text: string;
  category: string;
  tags: string[];
  favorite: boolean;
  createdBy: string;
}

const promptsSlice = createSlice({
  name: "prompts",
  initialState: {
    items: [] as Prompt[],
  },
  reducers: {
    setPrompts: (state, action: PayloadAction<Prompt[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setPrompts } = promptsSlice.actions;
export default promptsSlice.reducer;
