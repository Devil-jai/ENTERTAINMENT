import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookmarksAddContent,
  fetchBookmarksRemoveContent,
} from "../../hooks/fetchBookmarksContent";

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarksContent: [],  // Ensure it's always an array
    isLoading: false,
    error: null,
  },
  reducers: {
    setBookmarks(state, action) {
      state.bookmarksContent = action.payload;
    },
    clearBookmarks(state) {
      state.bookmarksContent = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarksAddContent.fulfilled, (state, action) => {
        const newBookmark = action.payload.content; // Ensure the structure here matches your data

        // Check if the bookmark already exists using _id
        const isAlreadyBookmarked = state.bookmarksContent.some(
          (bookmark) => bookmark._id === newBookmark._id
        );

        if (!isAlreadyBookmarked) {
          state.bookmarksContent.push(newBookmark); // Add bookmark
          console.log("Bookmark added:", newBookmark);
        } else {
          console.log("Bookmark already exists:", newBookmark);
        }
      })
      .addCase(fetchBookmarksRemoveContent.fulfilled, (state, action) => {
        // Remove bookmark using _id
        state.bookmarksContent = state.bookmarksContent.filter(
          (bookmark) => bookmark._id !== action.payload.content._id
        );
        console.log("Bookmark removed:", action.payload.content);
      });
  },
});

export const { setBookmarks, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
