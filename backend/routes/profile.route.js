const express=require('express');
const { validatelogIn } = require('../controller/auth.controller.js');
const { profileView, myBlog } = require('../controller/profile.controller.js');
const profileRouter=express.Router();
profileRouter.get('/profile/view',validatelogIn,profileView);
profileRouter.get('/myblog',validatelogIn,myBlog);
module.exports=profileRouter;
