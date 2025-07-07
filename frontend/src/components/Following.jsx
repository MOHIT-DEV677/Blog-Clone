import React, { useEffect } from 'react'
import { followingdata } from '../store/followingSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
const Following = () => {
  const dispatch=useDispatch();
  const file=useSelector((state)=>state.following);
  const getdata=async (req,res)=>{
    try{
    const data=await axios.get('http://localhost:3000/follow/following',{withCredentials:true});
    console.log(data.data.data[0]);
    if(data){
        dispatch(followingdata(data.data.data));
    }
    else throw new Error("following is not found");
  }catch(err){
    console.log(err.message);
  }}
  useEffect(()=>{
    getdata();
  },[]);
  return (
    <>
       <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Following</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {file && file.map((data, key) => (
          <div
            key={key}
            className="w-72 rounded-xl overflow-hidden shadow-md bg-base-100 hover:shadow-xl transition duration-300 border border-gray-200"
          >
            <div className="flex flex-col items-center p-5">
              <img
                src={data.toUserid.profileurl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-sm"
              />
              <h2 className="mt-4 text-lg font-bold text-center">{data.toUserid.userName}</h2>
              <p className="text-sm text-gray-500 text-center">{data.toUserid.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
};
export default Following
