const Blog=require('../models/blogSchema');
const addBlog=async (req,res)=>{
    try{
    const {title,description}=req.body;
    console.log(req.body);
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
        
    }
    catch(err){
        res.json({
            success:true,
            message:err.message ||"something went wrong",
        })
    }
}
module.exports={addBlog};