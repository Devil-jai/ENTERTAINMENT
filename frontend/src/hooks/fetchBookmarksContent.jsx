import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/constants";

// Add Bookmark
export const fetchBookmarksAddContent = createAsyncThunk(
  "Bookmarks/fetchBookmarksAddContent",
  async (movieId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    // If no token, return error message
    if (!token) {
      return rejectWithValue("You need to be logged in to add bookmarks");
    }

    try {
      const response = await axios.post(
        `${api}/api/v1/bookmarks/add`,
        { type: "movie", id: movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add bookmark");
    }
  }
);

// Remove Bookmark
export const fetchBookmarksRemoveContent = createAsyncThunk(
  "Bookmarks/fetchBookmarksRemoveContent",
  async (movieId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    // If no token, return error message
    if (!token) {
      return rejectWithValue("You need to be logged in to remove bookmarks");
    }

    try {
      const response = await axios.delete(
        `${api}/api/v1/bookmarks/remove`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { type: "movie", id: String(movieId) },
          withCredentials: true,
        }
        
      );
    
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to remove bookmark"
      );
    }
  }
);
