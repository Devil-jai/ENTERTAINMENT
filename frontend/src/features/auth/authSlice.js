import { createSlice } from "@reduxjs/toolkit";
import { authCheck, signup, logout, login } from "./authActions"; // Make sure logout is imported

const initialState = {
  user: null,
  isSigningUp: false,
  isCheckingAuth: false,
  isLoggingOut: false,
  isLogginIn : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can also define other reducers if necessary
  },
  extraReducers: (builder) => {
    builder
      // Handle signup async thunk
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
        state.user = null;
      })

      // Handle authCheck async thunk
      .addCase(authCheck.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.user = action.payload;
      })
      .addCase(authCheck.rejected, (state) => {
        state.isCheckingAuth = false;
        state.user = null;
      })

      // Handle logout async thunk
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggingOut = false;
        // Optionally handle errors
      })

      .addCase(login.pending , (state)=>{
        state.isLogginIn = true;
      })
      .addCase(login.fulfilled,(state,action) =>{
        state.user = action.payload;
        state.isLogginIn = false;
      })
      .addCase(login.rejected,(state)=>{
        state.isLogginIn = false ;
        state.user = null;
      })

  },
});

export default authSlice.reducer;
