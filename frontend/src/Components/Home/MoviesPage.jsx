import React, { useEffect, useState } from 'react';
import { fetchallContent } from '../../hooks/useGetAllContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBookmarksAddContent, fetchBookmarksRemoveContent } from '../../hooks/fetchBookmarksContent';
import { updateUserBookmarks } from '../../features/auth/authSlice.js';  

function MoviesPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allContent, contentType } = useSelector((state) => state.content);
  const { bookmarksContent } = useSelector((state) => state.bookmarks);
console.log("bookmarkscontent",bookmarksContent);
  // Ensure bookmarksContent is always an array
  
  const bookmarksArray = Array.isArray(user?.bookmarks) ? user?.bookmarks : [];

  // Local state for optimistic UI updates
  const [localBookmarks, setLocalBookmarks] = useState(bookmarksArray);

  // Update localBookmarks when bookmarksContent changes in the Redux store
  useEffect(() => {
    setLocalBookmarks(bookmarksArray); // Sync with Redux
  }, [bookmarksArray]);

  console.log("localbookmark",localBookmarks);
console.log("bookmarksArray",bookmarksArray);
  // Fetch all content only when the contentType changes
  useEffect(() => {
    if (contentType === 'movie') {
      dispatch(fetchallContent(contentType));
    }
  }, [contentType, dispatch]);

  // Handle the bookmark toggle action
  const handleBookmarkToggle = async (movie) => {
    console.log("movie",movie);
    const isBookmarked = localBookmarks.some((bookmark) => String(bookmark.id) === String(movie._id));
    
    // Optimistically update local bookmarks
    const updatedBookmarks = isBookmarked
      ? localBookmarks.filter((bookmark) => String(bookmark.id) !== String(movie._id))
      : [...localBookmarks, { id: movie._id, ...movie }];
 


    try {
      const result = isBookmarked
        ? await dispatch(fetchBookmarksRemoveContent(movie._id))
        : await dispatch(fetchBookmarksAddContent(movie._id));

      if (
        (isBookmarked && fetchBookmarksRemoveContent.fulfilled.match(result)) ||
        (!isBookmarked && fetchBookmarksAddContent.fulfilled.match(result))
      ) {
        // Dispatch action to update user's bookmarks in Redux
        dispatch(updateUserBookmarks(updatedBookmarks));
        
      } else {
        console.error("Error with bookmark toggle:", result.payload || "Failed to toggle bookmark");
        // Revert local update if API call fails
        setLocalBookmarks(isBookmarked
          ? [...localBookmarks, { id: movie._id, ...movie }]
          : localBookmarks.filter((bookmark) => bookmark.id !== movie._id));
      }
    } catch (error) {
      console.error("Error handling bookmark toggle:", error);
      setLocalBookmarks(isBookmarked
        ? [...localBookmarks, { id: movie._id, ...movie }]
        : localBookmarks.filter((bookmark) => bookmark.id !== movie._id));
    }
  };
  return (
    <div className="text-white">
      <h2 className="mb-4 text-2xl font-bold">Recommended for you</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {allContent?.movies?.map((item) => (
          <div key={item._id} className="relative">
            {/* Bookmark button */}
            <button
              onClick={() => handleBookmarkToggle(item)}
              className="absolute top-9 z-10 right-4 rounded-full bg-gray-500 w-7 h-7 text-center"
            >
              <i
                className={
                  localBookmarks.some((bookmark) => String(bookmark.id) === String(item._id))
                    ? "fa-solid fa-bookmark"
                    : "fa-regular fa-bookmark"
                }
                style={{ color: "#fff" }}
              ></i>
            </button>

            {/* Link to movie details page */}
            <Link to={`/watch/${item._id}`} className="group ms-4 ">
              <div className="rounded-lg overflow-hidden relative">
                <img
                  src={item.backdrop_path}
                  alt=""
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125 w-full"
                />
                <div className="absolute bottom-5 left-4 text-xs">
                  <span className="me-1">{item.release_date}</span> •
                  <i
                    className="fa-solid fa-film fa-sm mt-7 ms-2 me-2"
                    style={{ color: "#fff" }}
                  ></i>
                  <span>{item.contentType}</span>
                  <p className="text-xl font-bold">{item.title}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
