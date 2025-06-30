import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  idToken: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  idToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, "idToken"> & { idToken: string }>) {
      return { ...state, ...action.payload };
    },
    logout(state) {
      return initialState;
    },
    setIdToken(state, action: PayloadAction<string>) {
      state.idToken = action.payload;
    },
  },
});

export const { setUser, logout, setIdToken } = authSlice.actions;
export default authSlice.reducer;
