import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
export default authSlice.reducer;
