const Blog=require('../models/blogSchema');
const Status = require('../models/statusSchema');
const Comment=require('../models/CommentSchema');
const addBlog=async (req,res)=>{
    try{
    const {title,description}=req.body;
    const blog=new Blog({postedBy:req.user._id,title,description});
    await blog.save();
    res.json({
        success:true,
        message:"blog is added successfully",
        data:blog,
    })}
    catch(err){
        res.json({
            success:true,
            message:err.message ||"something went wrong",
        })
    }
}
const blogFeed=async (req,res)=>{
    try{
        const id=req.user._id;
        const blogs=await Blog.find({});
        if(!blogs){
            throw new Error("no blogs found");
        }
        const allBlog=blogs.filter(post=>post.postedBy.toString()!==id.toString());
        res.json({
            success:true,
            message:"display all blogs",
            data:allBlog,
        })
    }
    catch(err){
        res.json({
            success:true,
            message:err.message ||"something went wrong",
        })
    }
}
const status=async (req,res)=>{
    try{
    const {blogid}=req.body;
    const status=req.params.status;
    const fromid=req.user._id;
    const user=await Status.findOne({fromUserid:fromid},{Blogid:blogid});
    if(status==='null'){
        if(user){
            await Status.deleteOne({fromUserid:fromid,Blogid:blogid});
        }
        return res.json({
            message:"status is deleted",
        })
    }
    if(!user){
        const newstatus=new Status({
            fromUserid:fromid,
            Blogid:blogid,
            status:status,
        })
        await newstatus.save();
    }
    else{
        user.status=status;
        user.save();
    }
    res.json({
        success:true,
        message:`${status} is applied successfully`,
        data:user,
    })
    }catch(err){
        res.json({
            success:false,
            message:err.message || 'something went wrong',
        })
    }
}
const comment=async (req,res)=>{
    try{
    const {blogId,comment}=req.body;
    if(comment.trim()!==""){
        const com=new Comment({
            blogId:blogId,
            userId:req.user._id,
            Comment:comment,
        })
        await com.save();
        return res.json({
            success:true,
            message:"comment can be entered successfully",
            data:com,
        })
    }
    else{
        throw new Error("enter the valid comment");
    }
}catch(err){
    res.json({
        success:false,
        message:err.message || "something went wrong",
    })
}
}
module.exports={addBlog,blogFeed,status,comment};