import axios from 'axios'
import React, { useEffect } from 'react'
import {followdata} from '../store/followerSlice'
import { useDispatch, useSelector } from 'react-redux'
const Followers = () => {
  const dispatch=useDispatch();
  const fdata=useSelector((state)=>state.follower);
  const follow=async (req,res)=>{
    try{
      const data=await axios.get('http://localhost:3000/follow/follower',{withCredentials:true});
      if(!data){
         throw new Error("data is not found");
      }
      dispatch(followdata(data.data.data));
    }
    catch(err){
        console.log(err.message);
    }
  }
  useEffect(()=>{
    follow();
  },[]);
  return (
     <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Followers</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {fdata && fdata.map((data, key) => (
          <div
            key={key}
            className="w-72 rounded-xl overflow-hidden shadow-md bg-base-100 hover:shadow-xl transition duration-300 border border-gray-200"
          >
            <div className="flex flex-col items-center p-5">
              <img
                src={data.fromUserid.profileurl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-sm"
              />
              <h2 className="mt-4 text-lg font-bold text-center">{data.fromUserid.userName}</h2>
              <p className="text-sm text-gray-500 text-center">{data.fromUserid.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Followers
