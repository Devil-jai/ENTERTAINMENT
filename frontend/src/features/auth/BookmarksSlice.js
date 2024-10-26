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
      const newBookmark = action.payload.content;
      console.log("newBookmark",newBookmark);
      // Generate a temporary ID using the movieId passed into the thunk
      if (!newBookmark._id) {
        newBookmark._id = action.meta.arg; // movieId
        console.warn("Temporary ID assigned to the bookmark:", newBookmark._id);
      }
    
      const isAlreadyBookmarked = state.bookmarksContent.some(
        (bookmark) => bookmark._id === newBookmark._id
      );
    console.log("flskdjf");
      if (!isAlreadyBookmarked) {
        state.bookmarksContent.push(newBookmark); // Add bookmark
        console.log("Bookmark added:", newBookmark);
      } else {
        console.log("Bookmark already exists:", newBookmark);
      }
    })
    .addCase(fetchBookmarksRemoveContent.fulfilled, (state, action) => {
      
      const removedBookmark = action.payload;
    
    
      // Use movieId if _id is not returned
      const bookmarkId = action.meta.arg; // movieId

    console.log("bookmarkId",bookmarkId);
      state.bookmarksContent = state.bookmarksContent.filter(
        (bookmark) => bookmark._id !== bookmarkId
      );
      console.log("sdd",state.bookmarksContent);
    
      console.log("Bookmark removed:", removedBookmark);
    });
    
  },
});

export const { setBookmarks, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
