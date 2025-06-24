require("dotenv").config();
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
const FollowRouter=require('./routes/follow.route.js');
app.use("/",authRouter);
app.use("/",blogRouter);
app.use("/",profileRouter);
app.use("/",FollowRouter);
connectDB()
.then(() => {
  console.log("database is connected successfully");
  app.listen(process.env.SERVER_PORT_NUM, () => {
    console.log("server is running on port " + process.env.SERVER_PORT_NUM);
  });
})
.catch((err) => {
  console.log("database is failed to connect");
});
