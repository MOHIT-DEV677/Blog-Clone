const express=require('express');
const User = require('../models/userSchema');
const Blog = require('../models/blogSchema');
const profileView=async (req,res)=>{
    try{
    const {_id}=req.user;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("user is not found");
    }
    console.log(req.user);
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
    try{
    const postedby=req.user._id;
    const users=await Blog.find({});
    const postedBlog=users.filter(post=>post.postedBy.toString()===postedby.toString());
    res.json({
        success:true,
        message:"this is your blog",
        data:postedBlog
    });
}catch(err){
    res.json({
        success:true,
        message:err.message || "something went wrong",
    })
}
}
module.exports={profileView,myBlog}