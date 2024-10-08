import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../utils/constants";



// Async thunk for fetching trending content
export const fetchTrendingContent = createAsyncThunk(
  'trending/fetchTrendingContent',
  async (_,{ rejectWithValue }) => {

    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${api}/api/v1/movie/trending`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
      
      console.log("sdfas",response);
    
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch trending content");
    }
  }
);


 