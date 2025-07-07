import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:null,
    reducers:{
        userdata:(state,action)=>{
            return action.payload
        },
        removedata:(state,action)=>{
            return null;
        }
    }
});
export const {userdata,removedata}=userSlice.actions;
export default userSlice.reducer;