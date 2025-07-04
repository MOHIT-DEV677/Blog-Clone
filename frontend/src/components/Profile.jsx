import React, { useState } from 'react'
import axios from 'axios';
import {userdata} from '../store/userSlice'
import { useDispatch, useSelector } from 'react-redux';
const Profile = () => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user);
  const [name,setname]=useState("");
  const [profile,setprofile]=useState("");
  const [skills,setskills]=useState("");
  const [about,setabout]=useState("");
  const editprofile=async ()=>{
    try{
    const data=await axios.patch('http://localhost:3000/editprofile',{
        userName:name,
        profileurl:profile,
        skills:skills,
        about:about
    },{withCredentials:true});
    if(!data){
        throw new Error("data is not found");
    }
    dispatch(userdata(data.data.data));
} catch(err){
    console.log("data is not found");
}
  }
  return ( 
    <>
  {user && <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
  <div className="flex gap-6 items-stretch">
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 bg-base-300 flex flex-col justify-between">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username</legend>
        <input type="text" className="input" placeholder="Type here" value={name} onChange={(e)=>setname(e.target.value)} />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">ProfileUrl</legend>
        <input type="text" className="input" placeholder="Type here" value={profile} onChange={(e)=>setprofile(e.target.value)} />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Skills</legend>
        <input type="text" className="input" placeholder="Type here" value={skills} onChange={(e)=>setskills(e.target.value)} />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">About</legend>
        <input type="text" className="input" placeholder="Type here" value={about} onChange={(e)=>setabout(e.target.value)} />
      </fieldset>

      <div className="flex justify-center">
        <button className="btn btn-success" onClick={editprofile}>Save</button>
      </div>
    </div>
    <div className="card bg-base-300 max-w-md space-y-6 shadow-lg flex flex-col ">
      <figure>
        <img src={user.profileurl} alt="Profile" />
      </figure>
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title">Card Title</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
      </div>
    </div>
  </div>
</div>
}
</>
  )
}

export default Profile
