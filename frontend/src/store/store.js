import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import userReducer from './userSlice'
import followReducer from './followerSlice'
import followingReducer from './followingSlice'
export const store=configureStore({
    reducer:{
        blog:blogReducer,
        user:userReducer,
        follower:followReducer,
        following:followingReducer
    }
})
