const express=require('express');
const User = require('../models/userSchema');
const profileView=async (req,res)=>{
    try{
    const {_id}=req.user;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("user is not found");
    }
    res.json({
        success:true,
        message:"profile is get successfully",
        data:user
    })
}catch(err){
    res.json({
        success:false,
        message:err.message || "something went wrong",
    })
}
}
const myBlog=async (req,res)=>{
    
}
module.exports={profileView}