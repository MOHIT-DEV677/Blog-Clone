const express=require('express');
const { validatelogIn } = require('../controller/auth.controller');
const { addBlog } = require('../controller/blog.controller');
const blogRouter=express.Router();
blogRouter.post('/addblog',validatelogIn,addBlog);
blogRouter.get('/feed',validatelogIn);
module.exports=blogRouter;
