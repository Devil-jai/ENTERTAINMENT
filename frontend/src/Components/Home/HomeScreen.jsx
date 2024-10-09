import React from 'react'
import SignUpPage from '../SignUpPage'; 
import HomePage from './HomePage';
import { useSelector } from 'react-redux';



function HomeScreen() {
    const {user} = useSelector((state)=>state.auth)
    
  return (
    <div>
     
        {user? <HomePage/> : <SignUpPage/>}
    </div>
  )
}

export default HomeScreen