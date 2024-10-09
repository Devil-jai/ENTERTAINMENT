import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authActions';
import Navbar from '../Navbar';
import { fetchallContent, searchContent } from '../../hooks/useGetAllContent';
import TrendingNowSlider from './TrendingNowSlider';
import MoviesPage from './MoviesPage';
import TvPage from './TvPage';
import { Link, useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { contentType } = useSelector((state) => state.content);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array

  // Fetch content when contentType changes
  useEffect(() => {
    if (contentType && !searchQuery) {  // Fetch all content if no search query
      dispatch(fetchallContent(contentType));
    }
  }, [contentType, dispatch, searchQuery]);

  // Handle input change for search
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      // Assuming searchContent is a function that fetches search results
      dispatch(searchContent(searchQuery)).then((res) => {
        setSearchResults(res.payload || []); // Ensure it's always an array
      });
    } else {
      setSearchResults([]); // Clear search results if query is cleared
    }
  }, [searchQuery, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex p-5 justify-around'>
      <Navbar />
      <div className='w-svw ms-5'>
        {/* Search bar */}
        <div className="bg-[#10141E] relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg  overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#10141E]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-white pr-2 bg-[#10141E]"
            type="text"
            id="search"
            placeholder="Search for movies or TV series"
            value={searchQuery}
            onChange={handleInputChange} // Handle input change
          />
          <button onClick={handleLogout}> logout</button>
        </div>

        {/* Display content or search results */}
        <div className='max-w-[1370px]'>
          {/* If search results exist, show them */}
          {searchResults?.content?.contents?.length > 0 ? (
            <div>
              <h2 className="text-xl text-white my-5">Search Results</h2>
              {/* Render search results */}
              <div className="grid grid-cols-4 gap-4 text-white">
                {searchResults?.content?.contents?.map((item) => (
                 <Link to={`/watch/${item._id}`} className=" group ms-4" key={item._id}>
                 <div className="rounded-lg overflow-hidden relative">
                   <img
                     src={item.backdrop_path}
                     alt=""
                     className="transition-transform duration-300 ease-in-out group-hover:scale-125 w-full"
                   />
                   <div className="absolute bottom-5 left-4 text-xs">
                     <span className="me-1">{item.release_date}</span> •
                     <i className="fa-solid fa-film fa-sm mt-7 ms-2 me-2" style={{ color: "#fff" }}></i>
                     <span>{item.contentType}</span>
                     <p className="text-xl font-bold">{item.title}</p>
                   </div>
                 </div>
               </Link>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <p className="text-white mt-5">No results found for "{searchQuery}"</p>
          ) : (
            <>
              {/* Default content if no search query */}
              {location.pathname === "/" && (
                <>
                  <TrendingNowSlider />
                  <MoviesPage />
                </>
              )}
              {location.pathname === "/movies" && <MoviesPage />}
              {location.pathname === "/tv" && <TvPage />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
