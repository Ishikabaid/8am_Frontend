import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {}
  },

  reducers: {
    setAuthState(state, action) {
        state.user = action.payload
    },
  },
});

export const setUserActions = authSlice.actions;
export const selectCurUser = (state) => {
  debugger;
  return state.auth.user}
export default authSlice;