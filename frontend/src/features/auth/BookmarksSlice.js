import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBookmarksAddContent,
  fetchBookmarksRemoveContent,
  fetchShowBookmarksAddContent,
  fetchShowBookmarksRemoveContent,
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
      .addMatcher(
        (action) =>
          action.type === fetchBookmarksAddContent.fulfilled.type ||
          action.type === fetchShowBookmarksAddContent.fulfilled.type,
        (state, action) => {
          const newBookmark = action.payload.content;
          if (!newBookmark._id) {
            newBookmark._id = action.meta.arg; // Use ID from action arguments if missing
            console.warn("Temporary ID assigned to the bookmark:", newBookmark._id);
          }
  
          const isAlreadyBookmarked = state.bookmarksContent.some(
            (bookmark) => bookmark._id === newBookmark._id
          );
  
          if (!isAlreadyBookmarked) {
            state.bookmarksContent.push(newBookmark); // Add bookmark
            console.log("Bookmark added:", newBookmark);
          } else {
            console.log("Bookmark already exists:", newBookmark);
          }
        }
      )
      .addMatcher(
        (action) =>
          action.type === fetchBookmarksRemoveContent.fulfilled.type ||
          action.type === fetchShowBookmarksRemoveContent.fulfilled.type,
        (state, action) => {
          const bookmarkId = action.meta.arg; // Use ID from action arguments
  
          state.bookmarksContent = state.bookmarksContent.filter(
            (bookmark) => bookmark._id !== bookmarkId
          );
          console.log("Bookmark removed with ID:", bookmarkId);
        }
      );
  },
  
});

export const { setBookmarks, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
