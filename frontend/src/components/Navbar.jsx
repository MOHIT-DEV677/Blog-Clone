import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import axios from 'axios';
import { removedata } from '../store/userSlice';
const Navbar = () => {
  const userdata=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const [login,islogin]=useState(true);
  const navigate=useNavigate();
  const logout=async (req,res)=>{
    try{
      const data=await axios.post('http://localhost:3000/logout',{},{withCredentials:true});
      dispatch(removedata(userdata));
      navigate('/login');
    }catch(err){
      console.log(err.message);
    }
  }
  useEffect(()=>{
      if(!userdata){
        islogin(false);
      }
      else islogin(true);
  });
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Blogify</Link>
  </div>
  {login && <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {userdata && <div className="mr-2 w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={userdata.profileurl}/>
        </div>}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/followers">Followers</Link></li>
        <li><Link to="/following">Following</Link></li>
        <li><Link to="/myblog">My blog</Link></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
    </>
  )
}

export default Navbar
