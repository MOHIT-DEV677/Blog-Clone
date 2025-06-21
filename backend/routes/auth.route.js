const express=require("express");
const authRouter=express.Router();
const {validatesignUp, signUp, validatelogIn, logIn, logOut}=require('../controller/auth.controller')
authRouter.post("/signup",validatesignUp,signUp);
authRouter.post("/login",logIn);
authRouter.post("/logout",validatelogIn,logOut);
module.exports=authRouter;