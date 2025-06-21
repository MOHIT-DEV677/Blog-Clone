const Blog=require('../models/blogSchema');
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
module.exports={addBlog,blogFeed};