const mongoose=require('mongoose');
const {Schema}=mongoose;
const FollowSchema=new mongoose.Schema({
    fromUserid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    toUserid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:String,
        enum:{
            values:['following'],
            message:"this is not valid status",
        },
        required:true,
    }
},{timestamps:true})

const Follow=mongoose.model('follower',FollowSchema);
module.exports=Follow;