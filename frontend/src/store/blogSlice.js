import { createSlice } from "@reduxjs/toolkit";
const blogSlice=createSlice({
    name:'blog',
    initialState:[],
    reducers:{
        addBlog:(state,action)=>{
            return [...state,action.payload];
        },
        removeBlog:(state,action)=>{
            return state.filter((blog)=>blog._id!==action.payload._id);
        }
    }
});
export const {addBlog,removeBlog}=blogSlice.actions;
export default blogSlice.reducer;
