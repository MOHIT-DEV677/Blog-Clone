const mongoose=require('mongoose');
const {Schema} = mongoose;
const blogSchema=new mongoose.Schema({
    postedBy:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        validator:{
            validate:function(value){
                const countWords=value.trim().split(/\s+/).length;
                return countWords>=10 && countWords<=300;
            },
            message:"paragraph must be in the words between 10 and 500"
        }
    },
},{timestamps:true})
const Blog=mongoose.model('blog',blogSchema);
module.exports=Blog;