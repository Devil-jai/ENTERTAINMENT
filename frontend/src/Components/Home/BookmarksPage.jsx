import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchBookmarksRemoveContent } from '../../hooks/fetchBookmarksContent';

import { updateUserBookmarks } from '../../features/auth/authSlice.js';  

function BookmarksPage() {
  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.auth)

  const bookmarksArray = Array.isArray(user?.bookmarks) ? user?.bookmarks : [];

  // Local state for optimistic UI updates
  const [localBookmarks, setLocalBookmarks] = useState(bookmarksArray);

  const handleBookmarkToggle = async (movie) => {
    const isBookmarked = localBookmarks.some((bookmark) => bookmark.id === movie.id);

    if (isBookmarked) {
      // Remove bookmark
      try {
        const result = await dispatch(fetchBookmarksRemoveContent(movie.id));
        
        if (fetchBookmarksRemoveContent.fulfilled.match(result)) {
          const updatedBookmarks = localBookmarks.filter((bookmark) => bookmark.id !== movie.id);
          
          setLocalBookmarks(updatedBookmarks);  // Update local state
          dispatch(updateUserBookmarks(updatedBookmarks));  // Update Redux store
         
        } else {
          console.error("Error removing bookmark:", result.payload || "Failed to remove bookmark");
        }
      } catch (error) {
        console.error("Error removing bookmark:", error);
      }
    }
  };

  return (
    <div className="text-white">
    <h2 className="mb-4 text-2xl font-bold">Movies</h2>
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      { localBookmarks?.length === 0 ? (<p>Bookmark not found </p>)  : (
      user?.bookmarks?.map((item) => (
        <div key={item.id} className="relative">
          {/* Bookmark button */}
          <button
            onClick={() => handleBookmarkToggle(item)}  // Pass movie object to toggle function
            className="absolute top-4 z-10 right-4 rounded-full bg-gray-500 w-7 h-7 text-center"
          >
            <i
              className={
                localBookmarks.some((bookmark) => bookmark.id === item.id) 
                  ? "fa-solid fa-bookmark" 
                  : "fa-regular fa-bookmark"
              }
              style={{ color: "#fff" }}
            ></i>
          </button>

          {/* Link to movie details page */}
       
            <div className="rounded-lg overflow-hidden relative">
              <img
                src={item.backdrop_path}
                alt=""
                className="transition-transform duration-300 ease-in-out group-hover:scale-125 w-full"
              />
              <div className="bottom-5 left-4 text-xs">
                <span className="me-1">{item.release_date}</span> •
                <i
                  className="fa-solid fa-film fa-sm mt-7 ms-2 me-2"
                  style={{ color: "#fff" }}
                ></i>
                <span>{item.type}</span>
                <p className="text-xl font-bold">{item.title}</p>
              </div>
            </div>
      
        </div>
      )))}
    </div>
  </div>
  )
}

export default BookmarksPage