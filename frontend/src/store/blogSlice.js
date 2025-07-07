import { createSlice } from "@reduxjs/toolkit";
const blogSlice=createSlice({
    name:'blog',
    initialState:{
        nblog:[],
        myblog:[]
    },
    reducers:{
        addBlog:(state,action)=>{
            state.nblog=action.payload;
        },
        removeBlog:(state,action)=>{
            state.nblog=state.nblog.filter((blog)=>blog._id!==action.payload._id);
        },
        addmyblog:(state,action)=>{
            state.myblog=action.payload;
        }
    }
});
export const {addBlog,removeBlog,addmyblog}=blogSlice.actions;
export default blogSlice.reducer;
