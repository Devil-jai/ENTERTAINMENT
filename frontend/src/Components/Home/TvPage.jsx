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
  
  // Initialize and sync localBookmarks with Redux user bookmarks
  const [localBookmarks, setLocalBookmarks] = useState(
    Array.isArray(user?.bookmarks) ? user?.bookmarks : []
  );

  useEffect(() => {
    dispatch(setContentType("tv"));
    if (contentType === "tv") {
      setLoading(true); // Set loading before fetching
      dispatch(fetchallContent(contentType)).finally(() => setLoading(false));
    }
  }, [contentType, dispatch]);

  useEffect(() => {
    setLocalBookmarks(Array.isArray(user?.bookmarks) ? user?.bookmarks : []);
  }, [user?.bookmarks]);

  // Toggle bookmark status
  const handleBookmarkToggle = useCallback(
    async (show) => {
      const isBookmarked = localBookmarks.some(
        (bookmark) => String(bookmark._id) === String(show._id)
      );

      const updatedBookmarks = isBookmarked
        ? localBookmarks.filter((bookmark) => String(bookmark._id) !== String(show._id))
        : [...localBookmarks, { _id: show._id, ...show }];

      setLocalBookmarks(updatedBookmarks);

      try {
        const result = isBookmarked
          ? await dispatch(fetchShowBookmarksRemoveContent(show._id))
          : await dispatch(fetchShowBookmarksAddContent(show._id));

        if (result.payload && result.payload.success) {
          dispatch(updateUserBookmarks(updatedBookmarks));
        } else {
          console.error("Error toggling bookmark:", result.payload || "Unknown error");
          setLocalBookmarks(localBookmarks); // Revert UI on failure
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
      <h2 className="mb-4 text-2xl font-bold">TV Series</h2>
      <div className="grid grid-cols-4 gap-4">
        {contentType === "tv" && allContent?.movies?.length > 0 ? (
          allContent.movies.map((item) => {
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

                {/* TV show details link */}
                <Link to={`/watch/${item._id}`} className="min-w-[300px] group ms-4">
                  <div className="rounded-lg overflow-hidden relative">
                    <img
                      src={item.backdrop_path}
                      alt="show image"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                    />
                    <div className="absolute bottom-5 left-4 text-xs">
                      <span className="me-1">{item.first_aired}</span> •
                      <i className="fa-solid fa-film fa-sm mt-7 ms-2 me-2" style={{ color: "#fff" }}></i>
                      <span>{item.contentType}</span>
                      <p className="text-xl font-bold">{item.title}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    )}
    </div>
  );
}

export default TvPage;
