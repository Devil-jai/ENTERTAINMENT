import { createSlice } from "@reduxjs/toolkit";
import { fetchallContent } from "../../hooks/useGetAllContent";

const initialState = {
  allContent: null,
  isLoading: false,
  error: null,
  contentType: "movie",
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
      .addCase(fetchallContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchallContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allContent = action.payload;
      })
      .addCase(fetchallContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setContentType } = contentSlice.actions;
export default contentSlice.reducer;
