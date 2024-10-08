import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function BookmarksPage() {
    // const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
    console.log(user?.bookmarks);
   
  return (
    <div className='text-green-500'>
        BookmarksPage
    </div>
  )
}

export default BookmarksPage