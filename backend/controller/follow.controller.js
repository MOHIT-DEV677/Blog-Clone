const Follow = require("../models/followSchema");
const mongoose=require('mongoose');
const followRequest=async (req,res)=>{
    try{
        const Userid=req.params.Userid;
        const touserid=new mongoose.Types.ObjectId(Userid);
        const status=req.body.status;
        const existing=await Follow.findOne({fromUserid:req.user._id,toUserid:touserid});
        if(!existing){
        const user=new Follow({
            fromUserid:req.user._id,
            toUserid:touserid,
            status:status,
        })
        await user.save();
        res.json({
            success:true,
            message:'follow the user successfully',
            data:user,
        })
    }
    else throw new Error("already request found");
    }catch(err){
        res.json({
            success:false,
            message:err.message || "something went wrong",
        })
    }
}
const Follower=async (req,res)=>{
    try{
        const userid=req.user._id;
        const User=await Follow.find({toUserid:userid}).populate('fromUserid','userName profileurl');
        if(User.length===0){
            throw new Error("there is no follower found");
        }
        res.json({
            success:true,
            message:"follower can be displayed",
            data:User
        })
    }catch(err){
        res.json({
            success:false,
            message:err.message || "something went wrong",
        })
    }
}
const Following=async (req,res)=>{
    try{
        const userid=req.user._id;
        const data=await Follow.find({fromUserid:userid}).populate('toUserid','userName profileurl');
        if(data.length===0){
            throw new Error("there is no following user");
        }
        res.json({
            success:true,
            message:"following can be displayed",
            data:data,
        })
    }catch(err){
        res.json({
            success:false,
            message:err.message || "something went wrong",
        })
    }
}
module.exports={followRequest,Follower,Following};