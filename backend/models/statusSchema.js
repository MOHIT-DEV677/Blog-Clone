const mongoose=require('mongoose');
const { Schema } = mongoose
const statusSchema=new mongoose.Schema({
    fromUserid:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    Blogid:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:['like','dislike','null'],
            message:'the given api is invalid',
        }
    },
},{timestamps:true})
const Status=mongoose.model('status',statusSchema);
module.exports=Status;