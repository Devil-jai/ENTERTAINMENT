import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { api } from "../../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchallContent } from "../../hooks/useGetAllContent";
import { fetchTrendingContent } from "../../hooks/fetchtrendingContent";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function TrendingNowSlider() {
  const [showArrows, setShowArrows] = useState(false);
  const dispatch = useDispatch();
  const { allContent, contentType } = useSelector((state) => state.content);

  // const {trendingContent} = useSelector((state)=>state.trending)
  // console.log(trendingContent);

  useEffect(() => {
    // Fetch trending content when component mounts or contentType changes
    dispatch(fetchallContent(contentType));
  }, [contentType, dispatch]);

  // useEffect(()=>{
  //   dispatch(fetchTrendingContent())
  // },[dispatch])

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

  return (
<div className="text-white   
">
<h2 className="mb-4 text-2xl font-bold">Trending Now</h2>
        {allContent?.movies && allContent?.movies?.length>0 ? (
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          infinite={true}
          partialVisible={false}
          
        >
          {allContent?.movies?.map((item) => {
            return(
            <Link
              to={`/watch/${item._id}`}
              className=" "
              key={item._id}
            >
              <div className=" mx-2 ">
                <img
                  src={item.backdrop_path}
                  alt="Movie image"
                  className="transition-transform duration-300 rounded-lg ease-in-out group-hover:scale-125 "
                />
                <div className="absolute bottom-7 left-4 text-xs">
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
          )
        })}
        </Carousel>):"" }
      </div>

  );
}

export default TrendingNowSlider;
