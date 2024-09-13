import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingContent } from "../../hooks/useGetTrendingContent"; // Import the thunk

const initialState = {
  
  trendingContent: null,
  isLoading: false,
  error: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentType(state, action) {
      state.contentType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingContent = action.payload;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setContentType } = contentSlice.actions;
export default contentSlice.reducer;
