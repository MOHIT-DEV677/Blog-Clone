import { createSlice } from "@reduxjs/toolkit";
const followingSlice=createSlice({
    name:'following',
    initialState:[],
    reducers:{
        followingdata:(state,action)=>{
            return action.payload;
        }
    }
});
export const {followingdata}=followingSlice.actions;
export default followingSlice.reducer;