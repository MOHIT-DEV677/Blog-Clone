import React, { useEffect } from 'react'
import axios from 'axios'
import { addmyblog } from '../store/blogSlice'
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const myBlog = () => {
  const dispatch=useDispatch();
  const comments = useSelector((state) => state.comment);
  const file=useSelector((state)=>state.blog.myblog);
  const getdata=async (req,res)=>{
    try{
    const data=await axios.get('http://localhost:3000/myblog',{withCredentials:true});
    if(!data){
        throw new Error("blog is not found");
    }
    dispatch(addmyblog(data.data.data));
  }catch(err){
    console.log(err.message);
  }
  }
  useEffect(()=>{
    getdata();
  },[]);
  return (
    <>
      {file && file.map((data,key)=>{
          return (
            <div className="w-full max-w-4xl mx-auto mt-6 mb-6">
  <div className="card card-side bg-base-100 shadow-sm h-64"> {/* Fixed height */}
    <figure className="w-1/3 h-full">
      <img
        src={data.postedBy.profileurl}
        className="h-full w-full object-cover"
      />
    </figure>
    <div className="card-body bg-base-300 w-2/3 overflow-hidden">
      <h2 className="card-title">{data.title}</h2>
      <p className="text-sm line-clamp-4">
        {data.description}
      </p>
    </div>
    
  </div>
</div>
          );
        })}
    </>
  )
}

export default myBlog