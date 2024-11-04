import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utils/constants";
import { useSelector } from "react-redux";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function WatchPage() {
  const { id } = useParams(); // Extract the content ID from the URL
  const [loading, setLoading] = useState(true); // Loading state
  const [content, setContent] = useState({}); // State for content details
  const { contentType } = useSelector((state) => state.content); // Get content type from Redux state
  console.log(contentType);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    smallmobile: {
      breakpoint: { max: 464, min: 320 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };



  // Fetch content details when component mounts or contentType/id changes
  useEffect(() => {
    const getContentDetails = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve auth token from localStorage

      try {
        // Make a request to fetch content details using contentType and id
        const res = await axios.get(
          `${api}/api/v1/${contentType}/${id}/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setContent(res.data); // Set the content in state
      } catch (error) {
        console.log(error);
        if (error.message.includes("404")) {
          setContent(null); // Set content to null if not found
        }
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    getContentDetails(); // Call the function to fetch content details
  }, [contentType, id]); // Run effect when contentType or id changes

const movieDetails = contentType === "movie" ? content?.content?.movie : content?.content?.show

  const similarMovies = content?.content?.similarMovies
 

  return (
    <div className="text-white md:flex  md:flex-row justify-center mt-4 flex-col md:items-start flex items-center">
      <div className="md:w-1/4 w-1/2 md:me-24 ">
        <img src={movieDetails?.poster_path} className=" rounded-md " alt="" />
      </div>

      <div className="md:w-1/2 w-full px-8 md:px-0 mt-5">
        <h1 className="md:text-5xl text-2xl ">
          {movieDetails?.original_title}
        </h1>
        <h6 className="text-gray-400 md:mt-5 mt-2">{movieDetails?.title}</h6>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-1 mt-4 ">
          <div>
            <h6 className="text-gray-400 md:mt-0 mt-2">Language</h6>
            <p>English</p>
          </div>
          <div>
            <h6 className="text-gray-400 md:mt-0 mt-3">Release Date</h6>
            <p>{movieDetails?.release_date}</p>
          </div>
          <div>
            <h6 className="text-gray-400">vote-average</h6>
            <p>7.065</p>
          </div>
          <div>
            <h6 className="text-gray-400">vote-count</h6>
            <p>{movieDetails?.vote_count} </p>
          </div>
        </div>
        <div className="mt-5">
          <h6>Genres</h6>
          <div className="flex mt-1 text-black font-bold text-xs sm:text-base">
            {movieDetails?.genres.map((data, index) => (
              <span key={index} className="bg-white rounded px-2 me-2">
                {data}
              </span>
            ))}
          </div>
        </div>
      
      <div className="mt-6">
        <h6>Synopsis</h6>
        <p className="mt-1 text-gray-300">{movieDetails?.overview}</p>
      </div>
      {similarMovies && similarMovies.length > 0 ? (
        <div className="mt-6">
          <h6>Similar Movies</h6>
          <div className="parent mt-4">
            <Carousel
              responsive={responsive}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              infinite={true}
              partialVisible={false}
              dotListClass="custom-dot-list-style"
            >
              {similarMovies?.map((data) => {
                return (
                  <div className="slider" key={data?._id}>
                    <img src={data?.poster_path} alt="movie" />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
    </div>
  );
}

export default WatchPage;
