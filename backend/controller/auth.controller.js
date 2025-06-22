const User = require("../models/userSchema");
const validate=require("validator");
const bcrypt=require("bcrypt");
// const express=require('express');
const jwt=require('jsonwebtoken');
const validatesignUp = async (req,res,next)=>{
    try{
    const {userName,emailID,password}=req.body;
    if(!userName){
        throw new Error("enter the valid username");
    }
    if(!validate.isEmail(emailID)){
        throw new Error("enter the valid emailID");
    }
    if(!password){
        throw new Error("enter the password");
    }
    if(!validate.isStrongPassword(password)){
        throw new Error("enter the strong password");
    }
    next();
}
catch(err){
    res.json({
        success:false,
        message:err.message || "something went wrong",
    })
}
}
const validatelogIn=async (req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("please login");
    }
    const decoded=jwt.verify(token,'BLOG@123');
    const {_id}=decoded;
    const user=await User.findById({_id});
    if(!user){
        throw new Error("user is not exists");
    }
    req.user=user;
    next();
}catch(err){
    res.json({
        success:false,
        message:err.message || "something went wrong"
    })
}
}
const logIn=async (req,res)=>{
     try{
    const {emailID,password}=req.body;
    const user=await User.findOne({emailID:emailID});
    if(!user){
        throw new Error("invalid credentials");
    }
    const isValid=await user.validation(password);
    if(!isValid){
        throw new Error("invalid credentials");
    }
    const token=await user.getJWT();
    res.cookie('token',token,{expires:new Date(Date.now()+8*3600000)});
    res.json({
        success:true,
        message:"login successfully",
        data:user
    })
}catch(err){
    res.json({
        success:false,
        message:err.message || "something went wrong",
    })
}
}
const signUp=async (req,res)=>{
    try{
    const {userName,emailID,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const user=new User({userName,emailID,password:passwordHash});
    await user.save();
    req.user=user;
    const token=await user.getJWT();
    res.cookie('token',token,{expires:new Date(Date.now()+8*3600000)});
    res.json({
        success:true,
        message:"data is added successfully",
        data:user
    })
    }
    catch(err){
        res.json({
        success:false,
        message:err.message || "something went wrong",
    })
    }
}
const logOut=async (req,res)=>{
    try{
        const {token}=req.cookies;
        res.cookie('token',token,{expires:new Date(Date.now())});
        res.json({
            success:true,
            message:'logout successfully',
        })
    }
    catch(err){
        res.json({
            success:false,
            message:err.message || 'something went wrong',
        })
    }
}
module.exports={validatesignUp,validatelogIn,logIn,signUp,logOut};