import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/constants";

// Add Bookmark
export const fetchBookmarksAddContent = createAsyncThunk(
    'Bookmarks/fetchBookmarksAddContent',
    async (movieId, { rejectWithValue }) => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return rejectWithValue('No auth token found');
      }
  
      try {
        // Debugging Axios request data
        console.log("Sending bookmark add request with ID:", movieId);
  
        const response = await axios.post(
          `${api}/api/v1/bookmarks/add`, 
          { type: "movie", id: movieId },  // Make sure this format is correct
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'  // Ensure the correct content type
            },
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error while adding bookmark:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Failed to add bookmark");
      }
    }
  );
  export const fetchBookmarksRemoveContent = createAsyncThunk(
    'Bookmarks/fetchBookmarksRemoveContent',
    async (movieId, { rejectWithValue }) => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return rejectWithValue('No auth token found');
      }
  
      try {
        
        const response = await axios.delete(
          `${api}/api/v1/bookmarks/remove`, 
          
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Ensure this is correctly formatted
              'Content-Type': 'application/json'
            },
            data: { type: "movie", id: movieId },  // Correctly passing data for DELETE request
            withCredentials: true,
          }
        );
  
        return response?.data;
      } catch (error) {
        console.error("Error while removing bookmark:", error?.response?.data || error?.message);
        return rejectWithValue(error?.response?.data || "Failed to remove bookmark");
      }
    }
  );
  