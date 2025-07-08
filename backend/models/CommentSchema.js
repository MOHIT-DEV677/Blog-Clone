const mongoose=require('mongoose');
const {Schema}=mongoose;
const commentSchema=new Schema({
    blogId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    Comment:{
        type:String,
        default:'type your comment here',
        validate:{
            validator:function(value){
                const cntWords=value.trim().split(/\s/).length;
                return cntWords>=4 && cntWords<=100;
            },
            message:"comment must be inbetween 4 and 100 words"
        }
    }
},{timestamps:true});
const Comment=mongoose.model('comment',commentSchema);
module.exports=Comment;
