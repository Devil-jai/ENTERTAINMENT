import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import contentReducer from '../features/auth/contentSlice'
const store = configureStore({
    reducer:{
        auth: authReducer,
        content: contentReducer,
    }
})
export default store