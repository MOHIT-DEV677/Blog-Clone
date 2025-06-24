const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require("dotenv").config();
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:10
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileurl:{
        type:String,
        default:'https://imgs.search.brave.com/SRoGt0ZhB32j8AjRlfbsSp31bAmoO3giPTlcYWy6gVQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MDc4L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9c1VDZHgtTGlr/cWU3ZUJFY2JuMUZU/OHliT1FRSFhEZ0JL/THNKYzk5TXRDQT0',
    },
    skills:{
        type:Array,
    },
    gender:{
        type:String,
        enum:['male','female'],
    },
    about:{
        type:String,
        default:"this is about page"
    }
},{timestamps:true});
userSchema.methods.getJWT=async function(){
    const user=this;
    const password=user.password;
    const token=jwt.sign({ _id: user._id },process.env.JWT_KEY, { expiresIn: '7d' });
    return token;
}
userSchema.methods.validation=async function(passwordByUser){
    const user=this;
    const password=user.password;
    const isValid=await bcrypt.compare(passwordByUser,password);
    return isValid;
}
const User=mongoose.model('User',userSchema);
module.exports=User;