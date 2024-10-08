import { createSlice } from "@reduxjs/toolkit";
import { fetchBookmarksAddContent, fetchBookmarksRemoveContent } from "../../hooks/fetchBookmarksContent";

const initialState = {
  bookmarksContent: null,
  isLoading: false,
  error: null,
};

const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
      bookmarksContent: [],
    },
    reducers: {
      setBookmarks(state, action) {
        state.bookmarksContent = action.payload;
      },
      clearBookmarks(state) {
        state.bookmarksContent = [];
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBookmarksAddContent.fulfilled, (state, action) => {
          state.bookmarksContent.push(action.payload);
        })
        .addCase(fetchBookmarksRemoveContent.fulfilled, (state, action) => {
            state.bookmarksContent = state.bookmarksContent.filter(bookmark => bookmark._id !== action.payload._id);
            
        });
    },
  });
  
  export const { setBookmarks, clearBookmarks } = bookmarksSlice.actions;
  export default bookmarksSlice.reducer;