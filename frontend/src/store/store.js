import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import contentReducer from '../features/auth/contentSlice'
import trendingReducer from '../features/auth/trendingSlice'
const store = configureStore({
    reducer:{
        auth: authReducer,
        content: contentReducer,
        trending:trendingReducer
    }
})
export default store