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
const editProfile=async (req,res)=>{
    try{
        const ALLOWED_UPDATES=['userName','profileurl','skills','gender','about'];
        const loggedInuser=req.user;
        Object.keys(loggedInuser).every((key)=>{
            if(ALLOWED_UPDATES.includes(key)){
                loggedInuser[key]=req.body[key];
            }
        })
        await loggedInuser.save();
        res.json({
            success:true,
            message:"profile is saved successfully",
            data:loggedInuser
        })
    }catch(err){
        res.json({
            success:true,
            message:err.message || "something went wrong",
        })
    }
}
module.exports={profileView,myBlog,editProfile}