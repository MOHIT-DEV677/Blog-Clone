import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Profile from './Profile';

const Navbar = () => {
  const userdata=useSelector((state)=>state.user);
  const [login,islogin]=useState(true);
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
    <a className="btn btn-ghost text-xl">Blogify</a>
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
        <li><a>Followers</a></li>
        <li><a>Following</a></li>
        <li><a>My blog</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>}
</div>
    </>
  )
}

export default Navbar
