import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import contentReducer from '../features/auth/contentSlice'
import trendingReducer from '../features/auth/trendingSlice'
import BookmarksReducer from '../features/auth/BookmarksSlice'
const store = configureStore({
    reducer:{
        auth: authReducer,
        content: contentReducer,
        trending:trendingReducer,
        bookmarks:BookmarksReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['bookmarks/fetchBookmarksAddContent/fulfilled'], // Use the correct action type
            ignoredPaths: ['bookmarks.bookmarksContent'], // Correct lowercase path
          },
        }),
})
export default store