import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addBlog } from '../store/blogSlice'
const Feed = () => {
  const dispatch=useDispatch();
 const getBlog=async()=>{
    try{
     const data=await axios.get('http://localhost:3000/feed',{withCredentials:true});
     if(!data){
      throw new Error("data is not found");
     }
     {console.log(data)}
     dispatch(addBlog(data));
    }
    catch(err){

    }
 }
 useEffect(()=>{
  getBlog();
 },[]);
  return (
    <>
      <h1>BLOG</h1>
    </>
  )
}

export default Feed
