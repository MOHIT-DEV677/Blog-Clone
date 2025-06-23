const mongoose=require('mongoose');
const {Schema}=mongoose;
const FollowSchema=new mongoose.Schema({
    fromUserid:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    toUserid:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:['following'],
            message:"this is not valid status",
        },
        requied:true,
    }
},{timestamps:true})

const Follow=mongoose.model('follower',FollowSchema);
module.exports=Follow;