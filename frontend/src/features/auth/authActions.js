import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { api } from '../../utils/constants';



// Signup async action
export const signup = createAsyncThunk('auth/signup', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${api}/api/v1/auth/signup`, credentials , {withCredentials: true});
        console.log(response);
        toast.success("Account created successfully");
        return response.data.user;
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
        
        return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
});

export const login = createAsyncThunk('auth/login',async(credentials , {rejectWithValue}) => {
    try { 
        const response = await axios.post(`${api}/api/v1/auth/login`,credentials,{withCredentials: true})
        return response.data.user;
    } catch (error){
        toast.error(error.response?.data?.message || "An error occured")
        return rejectWithValue(error.response?.data?.message || "An error occured")
    }

})

export const authCheck = createAsyncThunk("auth/authCheck",async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${api}/api/v1/auth/authCheck`,{withCredentials: true})
        return response.data.user;
    } catch (error) {
        return rejectWithValue(null);
    }
})

export const logout = createAsyncThunk('auth/logout',async (_,{rejectWithValue})=>{
    try{
        await axios.post(`${api}/api/v1/auth/logout`,{},{withCredentials:true});
        toast.success("Logged out successfully")
        return null;
    } catch (error){
         return rejectWithValue(error.response.data.message || "Logout failed")
    }
})

