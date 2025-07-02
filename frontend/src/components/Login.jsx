import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {userdata} from '../store/userSlice'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const user = useSelector(state => state.user);  // 👈 Watch this state
  console.log("Redux user:", user);
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
 const getdata=async ()=>{
    try
    {
      const data=await axios.post('http://localhost:3000/login',{emailID:email,password},{withCredentials:true});
    if(!data){
      throw new Error("user is not found")
    }
    dispatch(userdata(data.data.data));
    navigate('/');
  }catch(err){

  }
 }
  return (
    <>
       <div className="min-h-screen flex flex-col items-center justify-center">
  <p className="text-2xl font-semibold mb-6">Login Page</p>

  <div className="space-y-6 w-full max-w-md p-6 bg-white rounded-xl shadow-md mx-auto">
  <fieldset className="border border-gray-300 rounded-md px-4 py-2">
    <legend className="text-sm text-gray-300 px-1">Email Id</legend>
    <input
      type="text"
      placeholder="Type here"
      className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={email}
      onChange={(e) => setemail(e.target.value)}
    />
  </fieldset>

  <fieldset className="border border-gray-300 rounded-md px-4 py-2">
    <legend className="text-sm text-gray-300 px-1">Password</legend>
    <input
      type="password"
      placeholder="Type here"
      className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={password}
      onChange={(e) => setpassword(e.target.value)}
    />
  </fieldset>

  <button className="btn mx-auto block" onClick={getdata}>Login</button>
</div>

</div>


    </>
  )
}

export default Login
