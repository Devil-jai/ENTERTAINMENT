import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../Navbar";
import { fetchallContent, searchContent } from "../../hooks/useGetAllContent";
import TrendingNowSlider from "./TrendingNowSlider";
import MoviesPage from "./MoviesPage";
import TvPage from "./TvPage";
import { Link, useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { contentType } = useSelector((state) => state.content);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 

  // Fetch content when contentType changes and no search query is active
  useEffect(() => {
    if (contentType && !searchQuery) {
      dispatch(fetchallContent(contentType));
    }
  }, [contentType, dispatch, searchQuery]);

  // Search function to handle the async request and result update
  const performSearch = useCallback(async (query) => {
    if (query) {
      const result = await dispatch(searchContent(query));
      setSearchResults(result.payload?.content?.contents || []);
    } else {
      setSearchResults([]);
    }
  }, [dispatch]);

  // Handle input change for search with debounce (immediate UI response)
  useEffect(() => {
    const timer = setTimeout(() => performSearch(searchQuery), 300);
    return () => clearTimeout(timer); // Clear timeout on cleanup
  }, [searchQuery, performSearch]);

  const handleInputChange = (e) => setSearchQuery(e.target.value);

  console.log(searchResults);

  
  const renderContent = () => {
    if (searchResults.length > 0) {
      return (
        <div>
          <h2 className="text-xl text-white my-5">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-white">
            {searchResults.map((item) => (
              <Link to={`/watch/${item._id}`} className="group ms-1" key={item._id}>
                <div className="rounded-lg overflow-hidden relative">
                  <img
                    src={item.backdrop_path}
                    alt=""
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125 w-full"
                  />
                  <div className="text-xs">
                    <span className=" text-[9px] sm:text-xs ">{item.release_date}</span>
                    <span className=" text-[9px] sm:text-xs sm:me-2 me-1">{item.first_aired}</span>•
                    <i className="fa-solid fa-film fa-sm mt-7 sm:mx-2 mx-1" style={{ color: "#fff" }}></i>
                    <span className="text-[9px] sm:text-xs">{item.contentType}</span>
                    <p className="text-xs sm:text-sm font-semibold mt-1">{item.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    } else if (searchQuery) {
      return <p className="text-white mt-5">No results found for "{searchQuery}"</p>;
    } else {
      return (
        <>
          {location.pathname === "/" && (
            <>
              <TrendingNowSlider />
              <MoviesPage />
            </>
          )}
          {location.pathname === "/movies" && <MoviesPage />}
          {location.pathname === "/tv" && <TvPage />}
        </>
      );
    }
  };

  return (
    <div className="flex lg:p-5 justify-around">
      <Navbar />
      <div className="w-svw px-5 pt-12 lg:pl-20 lg:pt-0">
        <div className="bg-[#10141E] relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#10141E]">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-white pr-2 bg-[#10141E]"
            type="text"
            id="search"
            placeholder="Search for movies or TV series"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>

        <div className="max-w-[1370px]">{renderContent()}</div>
      </div>
    </div>
  );
}

export default HomePage;
