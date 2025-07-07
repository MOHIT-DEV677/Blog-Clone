import { createSlice } from "@reduxjs/toolkit";
const followSlice=createSlice({
    name:'follower',
    initialState:[],
    reducers:{
        followdata:(state,action)=>{
            return action.payload;
        }
    }
});
export const {followdata}=followSlice.actions;
export default followSlice.reducer;