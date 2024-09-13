import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = "http://localhost:5000";

// Create an async thunk to fetch trending content
export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrendingContent',
  async (contentType, { rejectWithValue }) => {
    console.log(contentType);
    try {
      const response = await axios.get(`${api}/api/v1/${contentType}/trending`);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending content');
    }
  }
);
