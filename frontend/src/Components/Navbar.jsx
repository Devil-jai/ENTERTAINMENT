import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContentType } from "../features/auth/contentSlice"; // Adjust the path
import user from "../images/jai.jpg";

function Navbar() {
  const dispatch = useDispatch();

  const handleSetContentType = (type) => {
    // Set the content type before navigation
    dispatch(setContentType(type));
  };

  return (
    <aside className="lg:w-20 bg-indigo flex flex-col items-center my-4 lg:rounded-2xl lg:h-[650px] lg:fixed lg:left-0 lg:top-0 lg:flex lg:flex-col lg:justify-between lg:items-center lg:py-4 z-20">
      {/* Top Navbar for Small & Medium Screens */}
      <div className="w-full flex justify-around py-2 bg-indigo lg:hidden fixed top-0 left-0 z-50">
        <Link>
          <i
            className="fa-solid fa-clapperboard fa-lg"
            style={{ color: "red" }}
          ></i>
        </Link>
        <Link to="/" onClick={() => handleSetContentType("movie")}>
          <i
            className="fa-brands fa-microsoft fa-lg"
            style={{ color: "#fff" }}
          ></i>
        </Link>
        <Link to="/movies" onClick={() => handleSetContentType("movie")}>
          <i className="fa-solid fa-film fa-lg" style={{ color: "#fff" }}></i>
        </Link>
        <Link to="/tv" onClick={() => handleSetContentType("tv")}>
          <i className="fa-solid fa-tv fa-sm" style={{ color: "#fff" }}></i>
        </Link>
        <Link to="bookmark">
          <i
            className="fa-solid fa-bookmark fa-sm"
            style={{ color: "#fff" }}
          ></i>
        </Link>
        <img
          width={30}
          style={{ height: "30px" }}
          src={user}
          alt="user"
          className="border-white border rounded-full"
        />
      </div>

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:flex flex-col items-center w-20 bg-indigo py-4 rounded-2xl h-[650px] fixed top-0 left-0 mt-10">
        <Link>
          <i
            className="fa-solid fa-clapperboard fa-lg"
            style={{ color: "red" }}
          ></i>
        </Link>
        <div className="flex-col flex justify-between h-full pb-3">
          <div className="mt-14 flex-col flex gap-6 items-center">
            <Link to="/" onClick={() => handleSetContentType("movie")}>
              <i
                className="fa-brands fa-microsoft fa-lg"
                style={{ color: "#fff" }}
              ></i>
            </Link>
            <Link to="/movies" onClick={() => handleSetContentType("movie")}>
              <i
                className="fa-solid fa-film fa-lg mt-7"
                style={{ color: "#fff" }}
              ></i>
            </Link>
            <Link to="/tv" onClick={() => handleSetContentType("tv")}>
              <i className="fa-solid fa-tv fa-sm" style={{ color: "#fff" }}></i>
            </Link>
            <Link to="bookmark">
              <i
                className="fa-solid fa-bookmark fa-sm"
                style={{ color: "#fff" }}
              ></i>
            </Link>
          </div>
          <div>
            <img
              width={30}
              style={{ height: "30px" }}
              src={user}
              alt="user"
              className="border-white border rounded-full"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Navbar;
