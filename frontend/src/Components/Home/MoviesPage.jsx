import React, { useEffect, useState } from 'react';
import { fetchallContent } from '../../hooks/useGetAllContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBookmarksAddContent, fetchBookmarksRemoveContent } from '../../hooks/fetchBookmarksContent';

function MoviesPage() {
  const dispatch = useDispatch();
  const { allContent, contentType } = useSelector((state) => state.content);
  const { bookmarksContent } = useSelector((state) => state.bookmarks);

  // Ensure that bookmarksContent is always an array
  const bookmarksArray = Array.isArray(bookmarksContent) ? bookmarksContent : [];

  // Local state for optimistic UI updates
  const [localBookmarks, setLocalBookmarks] = useState(bookmarksArray);

  // Update localBookmarks when bookmarksContent changes in the Redux store
  useEffect(() => {
    setLocalBookmarks(bookmarksArray);
  }, [bookmarksContent]);

  // Fetch all content only when the contentType changes (prevents re-fetch on every render)
  useEffect(() => {
    if (contentType === 'movie') {
      dispatch(fetchallContent(contentType));
    }
  }, [contentType, dispatch]);

  // Handle the bookmark toggle action
  // Handle the bookmark toggle action
const handleBookmarkToggle = async (movie) => {
    const isBookmarked = localBookmarks.some((bookmark) => bookmark._id === movie._id);

    if (isBookmarked) {
        // Remove bookmark
        setLocalBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark._id !== movie._id));
        try {
            await dispatch(fetchBookmarksRemoveContent(movie._id));
        } catch (error) {
            console.error("Error removing bookmark:", error);
            // Optionally revert optimistic update
            setLocalBookmarks((prevBookmarks) => [...prevBookmarks, movie]);
        }
    } else {
        // Check if the movie is already bookmarked before adding
        try {
            // Dispatch action to add bookmark
            const result = await dispatch(fetchBookmarksAddContent(movie._id));
            // Check if the action was fulfilled (not already bookmarked)
            if (fetchBookmarksAddContent.fulfilled.match(result)) {
                // Bookmark added successfully
                setLocalBookmarks((prevBookmarks) => [...prevBookmarks, movie]);
            } else {
                // Handle case where movie is already bookmarked
                console.log("This movie is already bookmarked.");
            }
        } catch (error) {
            console.error("Failed to add bookmark:", error);
            // Rollback optimistic update if error occurs
            setLocalBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark._id !== movie._id));
        }
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
              onClick={() => handleBookmarkToggle(item)}  // Pass movie object to toggle function
              className="absolute top-9 z-10 right-4 rounded-full bg-gray-500 w-7 h-7 text-center"
            >
              <i
                className={
                  localBookmarks.some((bookmark) => bookmark._id === item._id) // Use _id consistently
                    ? "fa-solid fa-bookmark" 
                    : "fa-regular fa-bookmark"
                }
                style={{ color: "#fff" }}
              ></i>
            </button>

            {/* Link to movie details page */}
            <Link to={`/watch/${item._id}`} className="group ms-4">
              <div className="rounded-lg overflow-hidden relative">
                <img
                  src={item.backdrop_path}
                  alt="Movie image"
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
