import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authActions';
import Navbar from '../Navbar';
import { fetchTrendingContent } from '../../hooks/useGetTrendingContent';


function HomePage() {

  const {trendingContent} = fetchTrendingContent()
  console.log(trendingContent);
  const dispatch = useDispatch();

  const handleLogout  = () =>{
    dispatch(logout())
  }
  
  return (
    <div className='flex p-5'>
     <Navbar/>
    <div className='w-svw ms-5 '>
    

    <div className="bg-[#10141E] relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
        <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-white  pr-2 bg-[#10141E]"
        type="text"
        id="search"
        placeholder="Search for movies or TV series" /> 
    </div>

    </div>
    </div>
  )
}

export default HomePage