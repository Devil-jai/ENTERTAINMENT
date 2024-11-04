import React, { useEffect, useState, useCallback } from "react";
import { fetchallContent } from "../../hooks/useGetAllContent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchBookmarksAddContent,
  fetchBookmarksRemoveContent,
} from "../../hooks/fetchBookmarksContent";
import { updateUserBookmarks } from "../../features/auth/authSlice.js";
import { Loader } from "lucide-react";

function MoviesPage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allContent, contentType } = useSelector((state) => state.content);

  // Initialize local bookmarks from user data
  const [localBookmarks, setLocalBookmarks] = useState(
    Array.isArray(user?.bookmarks) ? user?.bookmarks : []
  );

  // Sync local bookmarks with Redux when user bookmarks change
  useEffect(() => {
    setLocalBookmarks(Array.isArray(user?.bookmarks) ? user?.bookmarks : []);
  }, [user?.bookmarks]);

  // Fetch all content when the contentType is "movie"
  useEffect(() => {
    if (contentType === "movie") {
      setLoading(true); // Set loading before fetching
      dispatch(fetchallContent(contentType)).finally(() => setLoading(false));
    }
  }, [contentType, dispatch]);

  // Toggle bookmark function
  const handleBookmarkToggle = useCallback(
    async (movie) => {
      const isBookmarked = localBookmarks.some(
        (bookmark) => String(bookmark._id) === String(movie._id)
      );

      // Optimistic UI update
      const updatedBookmarks = isBookmarked
        ? localBookmarks.filter(
            (bookmark) => String(bookmark._id) !== String(movie._id)
          )
        : [...localBookmarks, { _id: movie._id, ...movie }];
      setLocalBookmarks(updatedBookmarks);

      try {
        // Perform the bookmark toggle action
        const result = isBookmarked
          ? await dispatch(fetchBookmarksRemoveContent(movie._id))
          : await dispatch(fetchBookmarksAddContent(movie._id));

        if (result.payload && result.payload.success) {
          dispatch(updateUserBookmarks(updatedBookmarks));
        } else {
          console.error(
            "Bookmark toggle failed:",
            result.payload || "Error occurred"
          );
          setLocalBookmarks(localBookmarks); // Revert if action fails
        }
      } catch (error) {
        console.error("Error handling bookmark toggle:", error);
        setLocalBookmarks(localBookmarks); // Revert on error
      }
    },
    [dispatch, localBookmarks]
  );

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
        <h2 className="mb-4 text-2xl font-bold">Recommended for you</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {allContent?.movies?.map((item) => {
          const isBookmarked = localBookmarks.some(
            (bookmark) => String(bookmark._id) === String(item._id)
          );

          return (
            <div key={item._id} className="relative">
              {/* Bookmark button */}
              <button
                onClick={() => handleBookmarkToggle(item)}
                className="absolute top-8 right-2 z-10 rounded-full bg-gray-500 w-7 h-7 text-center"
              >
                <i
                  className={`fa-${isBookmarked ? "solid" : "regular"} fa-bookmark`}
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
                    <span className="me-1 text-xs">{item.release_date}</span> •
                    <i
                      className="fa-solid fa-film fa-sm mt-7 ms-2 me-2"
                      style={{ color: "#fff" }}
                    ></i>
                    <span className="text-xs">{item.contentType}</span>
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      </div>
      )}
      </div>
  );
}

export default MoviesPage;
