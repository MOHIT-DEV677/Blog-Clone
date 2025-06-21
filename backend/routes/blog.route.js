const express=require('express');
const { validatelogIn } = require('../controller/auth.controller');
const { addBlog, blogFeed } = require('../controller/blog.controller');
const blogRouter=express.Router();
blogRouter.post('/addblog',validatelogIn,addBlog);
blogRouter.get('/feed',validatelogIn,blogFeed);
module.exports=blogRouter;
