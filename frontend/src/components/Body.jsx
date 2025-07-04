import React, { useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import {Outlet, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {userdata} from '../store/userSlice'
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const getprofile=async(req,res)=>{
      const data=await axios.get('http://localhost:3000/profile/view',{withCredentials:true});
      if(!data.data.success){
        navigate('/login');
      }
      else{
        dispatch(userdata(data.data.data));
        navigate('/');
      }
    }
  useEffect(()=>{
    getprofile();
  },[]);
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
export default Body
