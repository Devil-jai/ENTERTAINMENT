import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingContent } from "../../hooks/fetchtrendingContent"; // Adjust path if needed

const initialState = {
  trendingContent: null,
  isLoading: false,
  error: null,
  
};

const trendingSlice = createSlice({
 name:'trending',
  initialState,
  reducers:{},
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
export default trendingSlice.reducer;
