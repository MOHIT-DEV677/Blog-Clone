const express=require('express');
const { validatelogIn } = require('../controller/auth.controller');
const {followRequest, Follower, Following} = require('../controller/follow.controller');
const FollowRouter=express.Router();
FollowRouter.post('/follow/:Userid',validatelogIn,followRequest);
FollowRouter.get('/follow/following',validatelogIn,Following);
FollowRouter.get('/follow/follower',validatelogIn,Follower);
module.exports=FollowRouter;
