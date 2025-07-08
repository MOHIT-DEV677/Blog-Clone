import { createSlice } from "@reduxjs/toolkit";

const commentSlice=createSlice({
    name:'comment',
    initialState:[],
    reducers:{
        addcomment:(state,action)=>{
            return action.payload;
        }
    }
});
export const {addcomment}=commentSlice.actions;
export default commentSlice.reducer;