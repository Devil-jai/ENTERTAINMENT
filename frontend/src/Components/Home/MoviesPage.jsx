import React, { useEffect } from 'react';
import { fetchallContent } from '../../hooks/useGetAllContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { api } from '../../utils/constants';

function MoviesPage(props) {
  const dispatch = useDispatch();
  const { allContent, contentType } = useSelector((state) => state.content);

  useEffect(() => {
    if (contentType === 'movie') {
      dispatch(fetchallContent(contentType));
    }
  }, [contentType, dispatch]);

console.log(props.data);
  return (
    <div className="text-white">
      <h2 className="mb-4 text-2xl font-bold">Recommended for you</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {allContent?.movies?.map((item) => (
          <Link to={`/watch/${item._id}`} className=" group ms-4" key={item._id}>
            <div className="rounded-lg overflow-hidden relative">
              <img
                src={item.backdrop_path}
                alt="Movie image"
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
  );
}

export default MoviesPage;
