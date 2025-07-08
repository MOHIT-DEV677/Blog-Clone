const express=require('express');
const { validatelogIn } = require('../controller/auth.controller');
const { addBlog, blogFeed, status, comment,getcomment} = require('../controller/blog.controller');
const blogRouter=express.Router();
blogRouter.post('/addblog',validatelogIn,addBlog);
blogRouter.get('/feed',validatelogIn,blogFeed);
blogRouter.post('/blog/:status',validatelogIn,status);
blogRouter.post('/comment',validatelogIn,comment);
blogRouter.get('/getcomment',validatelogIn,getcomment)
module.exports=blogRouter;
