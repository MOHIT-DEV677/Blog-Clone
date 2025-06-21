const express=require("express");
const cors=require("cors");
const connectDB=require("./database/database");
const app=express();
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(express());
app.use(express.json());
const authRouter=require('./routes/auth.route.js');
const blogRouter=require('./routes/blog.route');
const profileRouter=require('./routes/profile.route.js');
app.use("/",authRouter);
app.use("/",blogRouter);
app.use("/",profileRouter);
connectDB()
.then(()=>{
    console.log("database is connected successfully");
    app.listen("3000",()=>{
        console.log("server is running on port "+3000);
    })
})
.catch((err)=>{
    console.log("database is failed to connect");
})