import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:null,
    reducers:{
        userdata:(state,action)=>{
            return action.payload
        }
    }
});
export const {userdata}=userSlice.actions;
export default userSlice.reducer;