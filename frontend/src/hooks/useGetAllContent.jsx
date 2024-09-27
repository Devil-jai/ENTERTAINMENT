import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/constants";



// Async thunk for fetching trending content
export const fetchallContent = createAsyncThunk(
  'content/fetchallContent',
  async (contentType, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${api}/api/v1/${contentType}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.content;
    } catch (error) {
      console.error("Error fetching content:", error); // Log the error for debugging
      return rejectWithValue(error.response?.data?.message || "Failed to fetch content");
    }
  }
);


export const searchContent = createAsyncThunk(
  'content/searchContent',
  async (query, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');  // Check if token is retrieved properly
      if (!token) {
        throw new Error("No auth token found");
      }
      const res = await axios.get(`${api}/api/v1/search/movie/${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Ensure token is sent here
        },
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching search content:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to search content");
    }
  }
);
