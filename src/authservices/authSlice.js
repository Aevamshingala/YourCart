import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isVerified: false,
  userData: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Myuser: (state, action) => {
      state.isVerified = true;
      state.userData = action.payload;
    },
    logout: () => {
      state.isVerified = false;
      state.userData = null;
    },
  },
});

export const { Myuser } = authSlice.actions;

export default authSlice.reducer;
