import React, { useEffect, useState, useCallback } from 'react';
import { fetchallContent } from '../../hooks/useGetAllContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setContentType } from '../../features/auth/contentSlice';
import { fetchShowBookmarksAddContent, fetchShowBookmarksRemoveContent } from '../../hooks/fetchBookmarksContent';
import { updateUserBookmarks } from '../../features/auth/authSlice';
import { Loader } from 'lucide-react';

function TvPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allContent, contentType } = useSelector((state) => state.content);
  
  // Initialize local bookmarks with _id as a number
const [localBookmarks, setLocalBookmarks] = useState(
  Array.isArray(user?.bookmarks)
    ? user?.bookmarks.map((bookmark) => ({ ...bookmark, _id: Number(bookmark._id) }))
    : []
);

// Sync local bookmarks with Redux when user bookmarks change, with type conversion to number
useEffect(() => {
  setLocalBookmarks(
    Array.isArray(user?.bookmarks)
      ? user?.bookmarks.map((bookmark) => ({ ...bookmark, _id: Number(bookmark._id) }))
      : []
  );
}, [user?.bookmarks]);

  useEffect(() => {
    dispatch(setContentType("tv"));
    if (contentType === "tv") {
      setLoading(true); // Set loading before fetching
      dispatch(fetchallContent(contentType)).finally(() => setLoading(false));
    }
  }, [contentType, dispatch]);

  // Toggle bookmark status
  const handleBookmarkToggle = async (show) => {
    console.log("show", show);
  
    // Convert _id to number during comparisons
const isBookmarked = localBookmarks.some(
  (bookmark) => Number(bookmark._id) === Number(show._id)
);

// Ensure that the show being added or updated has _id as a number
const updatedBookmarks = isBookmarked
  ? localBookmarks.filter((bookmark) => Number(bookmark._id) !== Number(show._id))
  : [...localBookmarks, { _id: Number(show._id), ...show }];
  
    setLocalBookmarks(updatedBookmarks); // Immediate UI update
  
    try {
      // Execute API call based on bookmark status
      const result = isBookmarked
        ? await dispatch(fetchShowBookmarksRemoveContent(show._id))
        : await dispatch(fetchShowBookmarksAddContent(show._id));
  
      // Check for success in both add and remove cases
      if (result.payload && result.payload.success) {
        if (!isBookmarked) {
          // For add, update local state with new bookmark
          const newBookmark = {
            ...result.payload.content,
            release_date: result.payload.content.releaseDate,
          };
          const finalUpdatedBookmarks = [...localBookmarks, newBookmark];
          setLocalBookmarks(finalUpdatedBookmarks);
          dispatch(updateUserBookmarks(finalUpdatedBookmarks)); // Sync Redux state
        } else {
          // For remove, remove bookmark from local state
          const finalUpdatedBookmarks = localBookmarks.filter(
            (bookmark) => bookmark._id !== show._id
          );
          setLocalBookmarks(finalUpdatedBookmarks);
          dispatch(updateUserBookmarks(finalUpdatedBookmarks)); // Sync Redux state
        }
      } else {
        // Rollback if API call fails
        console.error(
          "Error with bookmark toggle:",
          result.payload || "Failed to toggle bookmark"
        );
        setLocalBookmarks(localBookmarks); // Revert local state on failure
      }
    } catch (error) {
      console.error("Error handling bookmark toggle:", error);
      setLocalBookmarks(localBookmarks); // Rollback on error
    }
  };
  

  return (
    <div>
        {loading ? (
        <div className="h-screen">
        <div className="flex justify-center items-center  h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div> // Show loading indicator
      ) : (
    <div className="text-white">
      <h2 className="mb-4 text-2xl font-bold">TV Series</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {contentType === "tv" && allContent?.movies?.length > 0 ? (
          allContent?.movies?.map((item) => {
            const isBookmarked = localBookmarks.some(
              (bookmark) => String(bookmark._id) === String(item._id)
            );
  
            return (
              <div key={item._id} className="relative">
                {/* Bookmark button */}
                <button
                  onClick={() => handleBookmarkToggle(item)}
                  className="absolute top-8 right-2 z-10 rounded-full bg-gray-500 sm:w-7 sm:h-7 w-6 h-6 flex justify-center items-center"
                >
                  <i
                    className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark fa-xs`}
                    style={{ color: "#fff" }}
                  ></i>
                </button>
  
                {/* Movie details link */}
                <Link to={`/watch/${item._id}`} className="group ms-4">
                  <div className="rounded-lg overflow-hidden relative">
                    <img
                      src={item.backdrop_path}
                      alt=""
                      className="transition-transform duration-300 ease-in-out group-hover:scale-125 w-full"
                    />
                    <div className=" bottom-5 left-4 text-xs">
                      <span className="me-1 text-[9px] sm:text-xs sm:me-2">{item.first_aired}</span>•
                      <i
                        className="fa-solid fa-film fa-sm mt-7 sm:mx-2 mx-1"
                        style={{ color: "#fff" }}
                      ></i>
                      <span className="text-[9px] sm:text-xs">{item.contentType}</span>
                      <p className="text-xs sm:text-sm font-semibold mt-1">{item.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p> </p>
        )}
      </div>
    </div>
    )}
    </div>
  );
}

export default TvPage;
