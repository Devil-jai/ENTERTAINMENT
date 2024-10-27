import React, { useEffect } from 'react';
import { fetchallContent } from '../../hooks/useGetAllContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { api } from '../../utils/constants';
import { setContentType } from '../../features/auth/contentSlice';

function TvPage() {
  const dispatch = useDispatch();
  const { allContent, contentType } = useSelector((state) => state.content);



  useEffect(() => {
    if (contentType === 'tv') {
      dispatch(fetchallContent(contentType));
    }
  }, [contentType, dispatch]);
console.log(contentType);
  useEffect(() => {
    dispatch(setContentType("tv"));
  }, [dispatch]);

  return (
    <div className="text-white">
    <h2 className="mb-4 text-2xl font-bold">TV Series</h2>
    <div className="grid grid-cols-4 gap-4">
      {
        contentType === "tv" ? (

      allContent?.movies?.map((item) => (
        <Link to={`${api}/watch/${item.id}`} className="min-w-[300px] group ms-4" key={item.id}>
          <div className="rounded-lg overflow-hidden relative">
            <img
              src={item.backdrop_path}
              alt="Movie image"
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
      ))
    ) : ("loading")
      }
    </div>
  </div>
);
}

export default TvPage;
