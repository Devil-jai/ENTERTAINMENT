import React, { useEffect, useState } from 'react';
import { fetchallContent } from '../../hooks/useGetAllContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBookmarksAddContent, fetchBookmarksRemoveContent } from '../../hooks/fetchBookmarksContent';

function MoviesPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allContent, contentType } = useSelector((state) => state.content);
  const { bookmarksContent } = useSelector((state) => state.bookmarks);

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
    const isBookmarked = localBookmarks.some((bookmark) => String(bookmark.id) === String(movie._id));

    // Optimistically update the local bookmarks state
    if (isBookmarked) {
      // Removing the bookmark
      setLocalBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => String(bookmark.id) !== String(movie._id))
      );
    } else {
      // Adding the bookmark
      setLocalBookmarks((prevBookmarks) => [...prevBookmarks, { id: movie._id, ...movie }]);
    }

    try {
      // Perform the API call for adding/removing bookmarks
      const result = isBookmarked
        ? await dispatch(fetchBookmarksRemoveContent(movie._id))
        : await dispatch(fetchBookmarksAddContent(movie._id));

      // Check if the API call was successful
      if (isBookmarked && !fetchBookmarksRemoveContent.fulfilled.match(result)) {
        console.error("Error removing bookmark:", result.payload || "Failed to remove bookmark");
        setLocalBookmarks((prevBookmarks) => [...prevBookmarks, { id: movie._id, ...movie }]);
      } else if (!isBookmarked && !fetchBookmarksAddContent.fulfilled.match(result)) {
        console.error("Error adding bookmark:", result.payload || "Failed to add bookmark");
        setLocalBookmarks((prevBookmarks) =>
          prevBookmarks.filter((bookmark) => bookmark.id !== movie._id)
        );
      }
     
    } catch (error) {
      console.error("Error handling bookmark toggle:", error);
      setLocalBookmarks((prevBookmarks) =>
        isBookmarked
          ? [...prevBookmarks, { id: movie._id, ...movie }] // Revert if removal failed
          : prevBookmarks.filter((bookmark) => bookmark.id !== movie._id) // Revert if addition failed
      );
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
